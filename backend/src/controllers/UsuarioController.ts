import type { Request, Response } from "express";
import Usuarios from "../models/Usuarios";


export class UsuarioController {
    static getAll = async (req: Request, res: Response) => {
        try{
            console.log('GET API/USER - OBTENER LOS USUARIOS')
            const usuarios = await Usuarios.findAll({
                order:[
                    ['id_usuario', 'ASC'] //Tner en cuenta si vamos a usar las fechas createdAt
                ]
            })
            res.json(usuarios)
        }catch(error){
            res.status(500).json({error: 'Ocurrio un error al obtener usuarios'})
        }
    }

    static getUserId = async (req: Request, res: Response) => {
        console.log('desde get id: /api/user')
        try{
            const {id} = req.params
            const usuario = await Usuarios.findByPk(id)
            if(!usuario){
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(usuario)
        }catch(error){
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static CrearUser = async (req: Request, res: Response) => {
        try{
            console.log(req.body)
            const usuario = new Usuarios(req.body)
            await usuario.save()
            res.status(201).json('USUARIO CREADO CORRECTAMENTE')
        }catch(error){
            res.status(500).json({error: 'Ocurrio un error al crear usuario'})
            console.error(error)
        }
    }


    static ActualizarUser = async (req: Request, res: Response) => {
        //console.log('desde update: /api/user')
        try{
            const {id} = req.params
            const usuario = await Usuarios.findByPk(id)
            if(!usuario){
                const error = new Error('User no encontrado')
                return res.status(404).json({error: error.message})
            }
            await usuario.update(req.body)
            res.json('Usuario Actualizado Correctamente')
        }catch(error){
            res.status(500).json({error: 'Hubo un error al atualizar usuario'})
        }
    }
    static eliminarUserId = async (req: Request, res: Response) => {
        console.log('desde delete: /api/user')
        try{
            const {id} = req.params
            const usuario = await Usuarios.findByPk(id)
            if(!usuario){
                const error = new Error('Usuarion no encontrado')
                return res.status(404).json({error: error.message})
            }
            await usuario.destroy()
            res.json('Usuario eliminado correctamente')
        }catch(error){
            res.status(500).json({error: 'Hubo un error al eliminar'})
        }
    }

}
