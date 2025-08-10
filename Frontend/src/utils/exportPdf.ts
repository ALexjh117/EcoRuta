// src/utils/exportPdf.ts
import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportUsuariosAPdf(usuarios: any[], nombreArchivo = "usuarios.pdf") {
  const doc = new jsPDF();

  const columnas = ["ID", "Nombre", "Email", "Nivel Actividad", "Estado"];
  const filas = usuarios.map(u => [
    u.id,
    u.nombre,
    u.email,
    u.nivelActividad,
    u.estado,
  ]);

  doc.text("Reporte de Usuarios", 14, 15);
  (doc as any).autoTable({
    head: [columnas],
    body: filas,
    startY: 20,
  });

  doc.save(nombreArchivo);
}
