import type { Request, Response } from "express";
import Sistema_Logros from "../models/SistemaLogros";

export class SistemaLogros {
    static getAllSitemaLogros = async (req: Request, res:Response) => {
        try{
           const logros = await Sistema_Logros.findAll(
            {order: [
                ['id_logro', 'ASC'],
            ],
            include: ['usuario']})
            return res.json(logros)
        }catch(error){
            console.error("Error al obtener logros:", error);
            res.status(500).json({ error: "Error al obtener todos los logros" });
        }
    }

    static getSistemaLogrosId = async (req:Request, res:Response) => {
        try {
        const { id } = req.params;
        const logro = await Sistema_Logros.findByPk(id, 
            { include: ['usuario'] });

        if (!logro) {
            return res.status(404).json({ error: "Logro del usuario no encontrado" });
        }
        res.json(logro);
        } 
        catch (error) {
            console.error("Error al obtener logro por id:", error);
            res.status(500).json({ error: "Hubo un error al obtener logro" });
        }
    }

    static crearSistemaLogros = async (req: Request, res:Response) => {
        try {
        const { id_usuario, descripcion_logro, puntos_usuario } = req.body;

        if (!id_usuario || puntos_usuario == null) { //revisar campos de la base de datos la parte de descripcio, ya que fue un campo que deje nulo
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        const nuevoLogro = await Sistema_Logros.create({
            id_usuario,
            descripcion_logro: descripcion_logro || null,
            puntos_usuario,
        });
        res.status(201).json(nuevoLogro);
        } catch (error) {
            console.error("Error al crear logro:", error);
            res.status(500).json({ error: "Hubo un error al crear el logro" });
        }
    }

    static actualizarSistemaLogros = async (req: Request, res:Response) => {
            try {
                const { id } = req.params;
                const { id_usuario, descripcion_logro, puntos_usuario } = req.body;

                const logro = await Sistema_Logros.findByPk(id);
                if (!logro) {
                    return res.status(404).json({ error: "Logro no encontrado" });
                }
                await logro.update({
                    id_usuario,
                    descripcion_logro,
                    puntos_usuario,
                });
                res.json(logro);
        }catch (error) {
            console.error("Error al actualizar el logro:", error);
            res.status(500).json({ error: "Hubo un error actualizar el logro" });
        }
    }

    static eliminarSitemaLogros = async (req: Request, res:Response) => {
            try {
            const { id } = req.params;
            const logro = await Sistema_Logros.findByPk(id);

            if (!logro) {
                return res.status(404).json({ error: "Logro no encontrado" });
            }
                await logro.destroy();
                res.json({ message: "Se elimino el logro correctamente" });
            } catch (error) {
                console.error("Error al eliminar el logro:", error);
                res.status(500).json({ error: "Hubo un error al eliminar el logro" });
            }
    }

}