import type { Request, Response } from "express";
import Recorridos from "../models/Recorridos";
import Rutas from '../models/Rutas'
import Sistema_Logros from "../models/SistemaLogros";

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
      const { id_ruta, fecha_recorrido, tiempo_ruta, km_recorridos, emision_co2, id_usuario, medio_transporte } = req.body;

      const nuevoRecorrido = await Recorridos.create({
        id_ruta,
        fecha_recorrido,
        tiempo_ruta,
        km_recorridos,
        emision_co2,
        id_usuario
      });
      // declarar variable de puntos
      let puntos =0
// por cada medio de transporte son puntos distitntos
      puntos+=Math.floor(km_recorridos)
      if(medio_transporte =="bicicleta")puntos +=5
      else if (medio_transporte =="caminata")puntos+=6
      else if(medio_transporte =="transporte_publico")puntos+=3

      const descripcion =`Recorrido de ${km_recorridos} km en ${medio_transporte}`;
console.log("Antes de crear logro, id_usuario:", id_usuario);
console.log("Descripcion:", descripcion);
console.log("Puntos:", puntos);
      
         const nuevoLogro = await Sistema_Logros.create({
      id_usuario,
      descripcion_logro: descripcion,
      puntos_usuario: puntos,
    });
    

      res.status(201).json({recorrido:nuevoRecorrido,logro:nuevoLogro});
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
static getRecorridosPorUsuario = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params;

    const recorridos = await Recorridos.findAll({
      include: [{
        model: Rutas,
        where: { id_usuario: Number(id_usuario) },  //  filtro por usuario en la tabla rutas
      }],
      order: [["fecha_recorrido", "DESC"]],
    });

    res.json(recorridos);
  } catch (error) {
    console.error("Error al obtener recorridos por usuario:", error);
    res.status(500).json({ error: "Error interno al obtener recorridos por usuario" });
  }
};
}