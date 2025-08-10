import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";




export const validateSystemLogroId = async(req: Request, res:Response, next: NextFunction) =>{
    await param('id')
    .isInt().withMessage('El id debe ser un numero entero')
    .custom(value => value > 0).withMessage('El id no debe ser menor a 0')
    .run(req)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    next()
}

export const validateSystemLogroBody = async (req: Request, res:Response, next: NextFunction) => {
    await body('id_usuario')
    .isInt().withMessage('El id del usuario debe ser un numero entero')
    .custom(value =>  value > 0).withMessage('El id del usuairo no debe ser menor a 0')
    .run(req)

    await body('descripcion').optional({ nullable: true }).isString()
    .withMessage('La descripcion debe ser texto')
    .isLength({max: 255}).withMessage('La descripcion no debe superar los 255 caracteres de texto')
    .run(req)
    await body('puntos_usuario').isInt({ min: 0 })
    .withMessage('Los puntos deben ser un número entero igual o mayor a 0')
    .run(req);

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    next()
}