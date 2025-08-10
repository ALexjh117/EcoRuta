import type { Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";

export const validateIdReporteUser = async (req: Request, res: Response, next: NextFunction) =>{
    await param('id').isInt().withMessage('El id deser un numero entero')
    .custom(value => value > 0).withMessage('El Id no dee ser menor a 0')
    .run(req)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array()});
        return
    }
    next()
}

export const validateBodyReporteUser = async (req: Request, res: Response, next: NextFunction) =>{
    await body('id_usuario').isInt().withMessage('El id de usuario debe ser un numero entero')
    .custom(value => value > 0).withMessage('El Id usuario no dee ser menor a 0')
    .run(req)

    await body('tipo_reporte').notEmpty()
    .withMessage('El tipo de reporte es obligatorio')
    .isLength({ max: 100 }).withMessage("El tipo_reporte debe tener máximo 100 caracteres")
    .run(req);

  await body("fecha_generacion")
    .notEmpty().withMessage("La fecha de generacion es obligatoria")
    .isISO8601().withMessage("La fecha de generacion debe ser una fecha valida (YYYY-MM-DD)")
    .toDate()
    .run(req);

  await body("archivo_ruta")
    .isString().withMessage("El archivo de ruta debe ser una cadena de texto")
    .isLength({ max: 255 }).withMessage("El archivo de ruta debe tener maximo 255 caracteres")
    .run(req);

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array()});
        return
    }
    next()
}