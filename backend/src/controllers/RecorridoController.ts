import type { Request, Response } from "express";
import Recorridos from "../models/Recorridos";

export class RecorridosController {
  static getAllRecorrido = async (req: Request, res: Response) => {
    try {
      const recorridos = await Recorridos.findAll(
        { order: [
            ['fecha_recorrido', 'DESC']
        ]});
      res.json(recorridos);
    } catch (error) {
      console.error("Error al obtener recorridos:", error);
      res.status(500).json({ error: "Error al obtener todos los recorridos" });
    }
  };

  static getRecorridoId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const recorrido = await Recorridos.findByPk(id);
      if (!recorrido) {
        return res.status(404).json({ error: "Recorrido no encontrado" });
      }
      res.json(recorrido);
    } catch (error) {
      console.error("Error al obtener recorrido por ID:", error);
      res.status(500).json({ error: "Hubo interno al obtener recorrido" });
    }
  };

  static crearRecorrido = async (req: Request, res: Response) => {
    try {
      const { id_ruta, fecha_recorrido, tiempo_ruta, km_recorridos, emision_co2 } = req.body;

      const nuevoRecorrido = await Recorridos.create({
        id_ruta,
        fecha_recorrido,
        tiempo_ruta,
        km_recorridos,
        emision_co2,
      });

      res.status(201).json(nuevoRecorrido);
    } catch (error) {
      console.error("Error creando recorrido:", error);
      res.status(500).json({ error: "Error interno al crear recorrido" });
    }
  };

  static ActualizarRecorrido = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { id_ruta, fecha_recorrido, tiempo_ruta, km_recorridos, emision_co2 } = req.body;

      const recorrido = await Recorridos.findByPk(id);
      if (!recorrido) {
        return res.status(404).json({ error: "Recorrido no encontrado" });
      }

      await recorrido.update({
        id_ruta,
        fecha_recorrido,
        tiempo_ruta,
        km_recorridos,
        emision_co2,
      });

      res.json(recorrido);
    } catch (error) {
      console.error("Error al actualizar recorrido:", error);
      res.status(500).json({ error: "Hubo un error al actualizar recorrido" });
    }
  };

  static EliminarRecorrido = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const recorrido = await Recorridos.findByPk(id);
      if (!recorrido) {
        return res.status(404).json({ error: "Recorrido no encontrado" });
      }

      await recorrido.destroy();
      res.json({ message: "Recorrido eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar recorrido:", error);
      res.status(500).json({ error: "Hubo un error al eliminar el recorrido" });
    }
  };
}
