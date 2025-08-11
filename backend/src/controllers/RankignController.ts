import type { Request, Response } from "express";
import Ranking from "../models/Ranking";
import Usuarios from "../models/Usuarios";

export class RankingController {
   static getAllRanking = async (req: Request, res: Response) => {
        try {
            const ranking = await Ranking.findAll({
                include: [{ model: Usuarios, attributes: ["id_usuario", "nombre"] }],
                order: [["posicion_usuario", "DESC"]],
            });

            res.status(200).json(ranking)
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el ranking", error })
        }
    }

    static getRankingById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const ranking = await Ranking.findByPk(id, {
                include: [{ model: Usuarios, attributes: ["id_usuario", "nombre"] }],
            });
            if (!ranking) {
                return res.status(404).json({ message: "Registro de ranking no encontrado" });
            }
            res.status(200).json(ranking)
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el registro", error })
        }
    }

    static createRanking = async (req: Request, res: Response) => {
        try {
            const { id_usuario, puntos } = req.body;
            const nuevoRanking = await Ranking.create({ id_usuario, puntos });
            res.status(201).json({ message: "Registro de ranking creado correctamente", nuevoRanking });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el registro de ranking", error });
        }
    }

    static ActualizarRanking = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { puntos } = req.body;
            const ranking = await Ranking.findByPk(id);
            if (!ranking) {
                return res.status(404).json({ message: "Registro de ranking no encontrado" });
            }
            await ranking.update({ puntos });
            res.status(200).json({ message: "Registro de ranking actualizado correctamente", ranking });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el registro", error });
        }
    }
 
    static EliminarRanking = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const ranking = await Ranking.findByPk(id);
            if (!ranking) {
                return res.status(404).json({ message: "Registro de ranking no encontrado" });
            }
            await ranking.destroy();
            res.status(200).json({ message: "Registro de ranking eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el registro", error });
        }
    }
}

