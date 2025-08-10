import type { Request, Response } from "express";
import Reportes_Usuarios from "../models/ReportesUsuarios";

export class ReportesUsuariosController {
    static getAllReporteUsuario = async (req: Request, res:Response) => {
        try{
            const reporte_usuario = await Reportes_Usuarios.findAll({
                order: [['fecha_generacion', 'DESC']],
                include: ['usuario']
            })
            return res.json(reporte_usuario)
        }catch(error){

        }
    }

    static getReporteUsuarioId = async (req:Request, res:Response) =>{
        try{
            const {id} = req.params
            const reporte_usuario = await Reportes_Usuarios.findByPk(id, {
                include:['usuario']
            })

            if(!reporte_usuario){
                return res.status(400).json({error:'No se encuentar el reporte del user'})
            }
            return res.json(reporte_usuario)
        }catch(error){
            console.error("Error al obtener reporte del user:", error);
            return res.status(500).json({ error: "Error al obtener reporte del user" });
        }
    }


    static crearReporteUsuario = async (req: Request, res: Response) => {
    try {
      const { id_usuario, tipo_reporte, fecha_generacion, archivo_ruta } = req.body;

      if (!id_usuario || !tipo_reporte || !fecha_generacion) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
      }

      const nuevoReporte = await Reportes_Usuarios.create({
        id_usuario,
        tipo_reporte,
        fecha_generacion,
        archivo_ruta
      });

      return res.status(201).json(nuevoReporte);

    } catch (error) {
      console.error("Error al crear reporte:", error);
      return res.status(500).json({ error: "Error interno al crear reporte" });
    }
  };

    static ActualizarReporteUsuario = async(req: Request, res:Response) =>{
        try{
            const {id} = req.params
            
            const { tipo_reporte, fecha_generacion, archivo_ruta } = req.body;
            const reporte_usuario = await Reportes_Usuarios.findByPk(id)
            if(!reporte_usuario){
                return res.status(404).json({error: 'No se encontro el reporte'})
            }
            await reporte_usuario.update({ tipo_reporte, fecha_generacion, archivo_ruta });
            return res.json(reporte_usuario);
        }catch(error){
            console.error('Error al Actualizar el Reporte del User:', error)
            return res.status(500).json({error: 'Error al actualizar reposrte'})
        }
    }

    static EliminarReporteUsuario = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const reporte = await Reportes_Usuarios.findByPk(id);

            if (!reporte) {
                return res.status(404).json({ error: "Reporte no encontrado" });
            }
            await reporte.destroy();
            return res.json({ message: "Reporte eliminado correctamente" });
        }catch(error){
            console.error("Error al eliminar reporte:", error);
        return res.status(500).json({ error: "Error interno al eliminar reporte" });
        }
    }
}