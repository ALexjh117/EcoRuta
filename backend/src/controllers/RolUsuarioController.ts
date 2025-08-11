import type { Request, Response } from "express";
import RolUsuario from "../models/RolUsuario";

export class RolUsuarioController {
    static getAllRolUser = async (req:Request, res: Response) =>{
        try{
            const rolusuario = await RolUsuario.findAll({
                order: [['id_rol', 'Asc']]
            })
            res.json(rolusuario)
        }catch(error){
            res.status(500).json({error: 'Hubo un error'})
        }
    }

     static getAllRolUserId = async (req:Request, res: Response) =>{
        try{
            const {id} = req.params
            const rolusuario = await RolUsuario.findByPk(id)
            if(!rolusuario) {
                const error = new Error('RolUsuario no encontrado')
                res.status(404).json({error:error.message})
                return;
            }
            res.json(rolusuario)
        }catch(error){
            res.status(500).json({error: 'hubo un error'})
        }
    }

     static crearRolUser = async (req:Request, res: Response) =>{
            try {
                const rolusuario = await RolUsuario.create(req.body);
                res.status(201).json({ message: 'RolUsuario creado exitosamente'});
        }catch (error) {
            console.error('Error al crear el RolUsuario:', error);
            res.status(500).json({ error: 'Error al crear el rol de usuario' });
        }
    }

     static ActualizarRolUser = async (req:Request, res: Response) =>{
        try{
             const {id} = req.params
            const rolusuario = await RolUsuario.findByPk(id)
            if(!rolusuario) {
                const error = new Error('RolUsuario no encontrado')
                res.status(404).json({error:error.message})
                return;
            }
            await rolusuario.update(req.body)
            res.json('Rol del Usuario actualizado exitosamente')
        }catch(error){
             res.status(500).json({error: 'hubo un error'})
        }
    }

     static EliminarRolUser = async (req:Request, res: Response) =>{
        try{
            const {id} = req.params
            const rolusuario = await RolUsuario.findByPk(id)
            if(!rolusuario) {
                const error = new Error('Rol del Usuario no encontrado')
                res.status(404).json({error:error.message})
                return;
            }
            await rolusuario.destroy()
            res.json('Rol del Usuario eliminado exitosamente')
        }catch(error){
             res.status(500).json({error: 'hubo un error'})
        }
    }
}