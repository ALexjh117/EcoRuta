import type{ Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';



export const validateIdRanking = async (req:Request, res: Response, next: NextFunction) => {
    await param('id').isInt().withMessage('Id no valido')
    .custom(value => value > 0)
    .withMessage('Id no Valido')
    .run(req)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }
    next()
}


export const validateBodyRanking = async (req:Request, res:Response, next: NextFunction) => {
    await body('posicion_usuario').notEmpty()
    .withMessage("La posicion del usuario es obligatoria")
    .isInt({ min: 0 }).withMessage("La posicion del usuario debe ser un numero igual o mayor a 0")
    .run(req);

    await body('cantidad_rutas').notEmpty()
    .withMessage('La cantidad de rutas es obligatoria')
    .isInt({min: 0}).withMessage('La cantidad de rutas debe ser un numero igual o mayor a 0')
    .run(req)

    await body('id_usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero')
    .custom(value =>  value > 0).withMessage('El id del usuairo no debe ser menor a 0')
    .run(req)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}