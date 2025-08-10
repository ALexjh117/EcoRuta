import type { Request, Response } from "express";
import Rutas from "../models/Rutas";

export class RutasController {
  static getAllRutas = async (req: Request, res: Response) => {
    try {
      const rutas = await Rutas.findAll(
        { order: [
            ["id_ruta", "ASC"]
        ]});
      return res.json(rutas);
    } catch (error) {
      console.error("Error al obtener rutas:", error);
      return res.status(500).json({ error: "Error al obtener todas las rutas" });
    }
  };

  static getRutasId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ruta = await Rutas.findByPk(id);
      if (!ruta) {
        return res.status(404).json({ error: "Ruta no encontrada" });
      }
      return res.json(ruta);
    } catch (error) {
      console.error("Error al obtener ruta:", error);
      return res.status(500).json({ error: "Error al obtener la ruta" });
    }
  };

  static crearRutas = async (req: Request, res: Response) => {
    try {
      const {
        id_usuario,
        nombre_ruta,
        punto_origen_lat,
        punto_origen_lng,
        punto_destino_lat,
        punto_destino_lng,
        medio_transporte,
      } = req.body;

      const nuevaRuta_Usuario = await Rutas.create({
        id_usuario,
        nombre_ruta,
        punto_origen_lat,
        punto_origen_lng,
        punto_destino_lat,
        punto_destino_lng,
        medio_transporte,
      });

      return res.status(201).json(nuevaRuta_Usuario);
    } catch (error) {
      console.error("Error al crear ruta:", error);
      return res.status(500).json({ error: "Hubo un error al crear ruta" });
    }
  };

  static ActualizarRutas = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        id_usuario,
        nombre_ruta,
        punto_origen_lat,
        punto_origen_lng,
        punto_destino_lat,
        punto_destino_lng,
        medio_transporte,
      } = req.body;

      const rutas = await Rutas.findByPk(id);
      if (!rutas) {
        return res.status(404).json({ error: "Ruta no encontrada" });
      }

      await rutas.update({
        id_usuario,
        nombre_ruta,
        punto_origen_lat,
        punto_origen_lng,
        punto_destino_lat,
        punto_destino_lng,
        medio_transporte,
      });

      return res.json(rutas);
    } catch (error) {
      console.error("Error al actualizar ruta:", error);
      return res.status(500).json({ error: "Hubo un error al actualizar ruta" });
    }
  };

  static EliminarRutas = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const rutas = await Rutas.findByPk(id);
      if (!rutas) {
        return res.status(404).json({ error: "Ruta no encontrada" });
      }
      await rutas.destroy();
      return res.json({ message: "Ruta eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar ruta:", error);
      return res.status(500).json({ error: "Hubo un error al eliminar ruta" });
    }
  };

static obtenerOCrearRuta = async (req: Request, res: Response) => {
  try {
    const {
      id_usuario,
      nombre_ruta,
      punto_origen_lat,
      punto_origen_lng,
      punto_destino_lat,
      punto_destino_lng,
      medio_transporte,
    } = req.body;

    let ruta = await Rutas.findOne({
      where: {
        id_usuario,
        punto_origen_lat,
        punto_origen_lng,
        punto_destino_lat,
        punto_destino_lng,
        medio_transporte,
      },
    });

    if (!ruta) {
      ruta = await Rutas.create({
        id_usuario,
        nombre_ruta,
        punto_origen_lat,
        punto_origen_lng,
        punto_destino_lat,
        punto_destino_lng,
        medio_transporte,
      });
    }

    return res.json(ruta);
  } catch (error) {
    console.error("Error en obtenerOCrearRuta:", error);
    return res.status(500).json({ error: "Error interno" });
  }
};

}