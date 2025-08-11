// controllers/AdminController.ts
import { Request, Response } from "express"; 
// Importa tipos Request y Response de Express para manejar solicitudes y respuestas HTTP.

import Usuarios from "../models/Usuarios"; 
// Importa el modelo Usuarios para interactuar con la tabla de usuarios en la base de datos.

import Rutas from "../models/Rutas"; 
// Importa el modelo Rutas para interactuar con la tabla de rutas.

import PDFDocument from "pdfkit"; 
// Importa la librería para crear documentos PDF.

import ExcelJS from "exceljs"; 
// Importa la librería para crear archivos Excel (.xlsx).

export class AdminController {
  // Define una clase estática con métodos para el manejo administrativo.

  // Listar usuarios con paginación simple
  static async getUsers(req: Request, res: Response) {
    try {
      // Obtener número de página desde la consulta; si no hay, se usa 1.
      const page = Number(req.query.page || 1);

      // Obtener límite de registros por página; si no hay, se usa 20.
      const limit = Number(req.query.limit || 20);

      // Calcular desde qué registro empezar (offset) según página y límite.
      const offset = (page - 1) * limit;

      // Buscar usuarios con count (total) y filas paginadas.
      const { count, rows } = await Usuarios.findAndCountAll({
        // Seleccionar solo campos específicos para no traer datos innecesarios.
        attributes: ["id_usuario", "nombre", "apellido", "correo"],

        // Limitar cantidad de registros al valor del límite.
        limit,

        // Saltar registros según el offset calculado.
        offset,

        // Ordenar resultados ascendentemente por id_usuario.
        order: [["id_usuario", "ASC"]],
      });

      // Responder con JSON que incluye total de registros, página actual, límite y los usuarios.
      res.json({
        ok: true,
        total: count,   // Total de usuarios existentes.
        page,           // Página actual solicitada.
        perPage: limit, // Cuántos usuarios por página.
        users: rows,    // Los usuarios consultados en esta página.
      });
    } catch (e) {
      // Si ocurre un error, lo loguea en consola y responde con error 500.
      console.error(e);
      res.status(500).json({ error: "Error listando usuarios" });
    }
  }

  // Listar rutas con paginación simple (igual que usuarios, pero para rutas)
  static async getRoutes(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const offset = (page - 1) * limit;

      // Consulta de rutas paginada con campos seleccionados.
      const { count, rows } = await Rutas.findAndCountAll({
        attributes: ["id_ruta", "nombre_ruta", "medio_transporte"],
        limit,
        offset,
        order: [["id_ruta", "ASC"]],
      });

      // Respuesta JSON con datos de rutas.
      res.json({ ok: true, total: count, page, perPage: limit, routes: rows });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error listando rutas" });
    }
  }

  // Generar reporte PDF con listado de usuarios
  static async generatePdfReport(req: Request, res: Response) {
    try {
      // Trae todos los usuarios sin paginar para el reporte.
      const users = await Usuarios.findAll({
        attributes: ["id_usuario", "nombre", "apellido", "correo"],
        order: [["id_usuario", "ASC"]],
      });

      // Crear nuevo documento PDF con margen de 30.
      const doc = new PDFDocument({ margin: 30 });

      // Configura cabeceras HTTP para indicar que se envía un PDF adjunto.
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=usuarios_report.pdf");

      // Envía el PDF generado directamente en la respuesta.
      doc.pipe(res);

      // Escribe un título centrado en el PDF.
      doc.fontSize(18).text("Reporte de Usuarios", { align: "center" });

      // Añade un espacio abajo para separar el título del contenido.
      doc.moveDown();

      // Por cada usuario, escribe sus datos en el PDF con fuente tamaño 12.
      users.forEach((u: any) => {
        doc.fontSize(12).text(`${u.id_usuario} - ${u.nombre} ${u.apellido} - ${u.correo}`);
      });

      // Finaliza el documento PDF (importante para que se complete la transmisión).
      doc.end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error generando PDF" });
    }
  }

  // Generar reporte Excel con listado de rutas
  static async generateExcelReport(req: Request, res: Response) {
    try {
      // Trae todas las rutas ordenadas por id.
      const routes = await Rutas.findAll({
        order: [["id_ruta", "ASC"]],
      });

      // Crear nuevo libro de Excel.
      const workbook = new ExcelJS.Workbook();

      // Crear una hoja llamada "Rutas".
      const sheet = workbook.addWorksheet("Rutas");

      // Define las columnas de la hoja con encabezados y ancho.
      sheet.columns = [
        { header: "Id", key: "id", width: 10 },
        { header: "Nombre", key: "nombre", width: 30 },
        { header: "FechaInicio", key: "fecha", width: 20 },
        // Puedes agregar más columnas aquí si tu modelo las tiene.
      ];

      // Por cada ruta, añade una fila con sus datos a la hoja.
      routes.forEach((r: any) => {
        sheet.addRow({
          id: r.id_ruta,
          nombre: r.Nombre || r.nombre || "",         // Usa el nombre que exista.
          fecha: r.FechaInicio || r.fecha_inicio || "", // Fecha en distintos posibles formatos.
        });
      });

      // Configura cabeceras HTTP para enviar un archivo Excel adjunto.
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=rutas_report.xlsx");

      // Escribe el archivo Excel en la respuesta HTTP.
      await workbook.xlsx.write(res);

      // Finaliza la respuesta.
      res.end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error generando Excel" });
    }
  }
}
