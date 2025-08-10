import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";

export const validateIdRecorrido = async (req:Request, res:Response, next: NextFunction) => {
    await param('id').isInt().withMessage('El id debe ser un numero entero')
    .custom(value => value > 0).withMessage('El id no puede ser menor que 0')
    .run(req)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    next()
}

export const validateRecorridoBody = async (req:Request, res:Response, next:NextFunction) => {
    await body('id_ruta')
    .isInt().withMessage('El id de la ruta debe ser un numero entero')
    .custom(value => value > 0).withMessage('El id de la ruta no debe ser menor a 0')
    .run(req)

    await body("fecha_recorrido").notEmpty().withMessage("La fecha recorrido es obligatoria")
    .isISO8601().withMessage("La fecha recorrido debe ser una fecha válida (YYYY-MM-DD)").toDate()
    .run(req);

    await body("tiempo_ruta").notEmpty().withMessage("El tiempo ruta es obligatorio")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/) //chastito me dijo que macthes se usa para asegurarse que el dato recibido cumpla el formato esperado (HH:mm:ss). 
    .withMessage("El tiempo ruta debe tener formato HH:mm:ss")
    .run(req);

    await body("km_recorridos").optional({ nullable: true }).isFloat({ min: 0 }) //en cuanto al uso de optional va apermitir que el cliente no envie los campos nulos, no sean vacios y no los reciba en prodcucion
    .withMessage("km recorridos debe ser un numero decimal positivo")
    .run(req);

    await body("emision_co2").optional({ nullable: true }).isFloat({ min: 0 })
    .withMessage("emision co2 debe ser un numero decimal positivo")
    .run(req);

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    next()
}