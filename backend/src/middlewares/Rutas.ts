import type { Request, Response, NextFunction } from "express";
import { param, body, validationResult } from "express-validator";

export const validateIdRuta = async (req: Request, res: Response, next: NextFunction) => {
  await param("id")
    .isInt().withMessage("El id debe ser un numero entero")
    .custom(value => value > 0).withMessage("El id no puede ser menor o igual a 0")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const validateRutaBody = async (req: Request, res: Response, next: NextFunction) => {
  await body("id_usuario")
    .isInt().withMessage("El id de usuario debe ser un numero entero")
    .custom(value => value > 0).withMessage("El id de usuario no puede ser menor o igual a 0")
    .run(req);

  await body("nombre_ruta")
    .notEmpty().withMessage("El nombre de la ruta es obligatorio")
    .isLength({ max: 100 }).withMessage("El nombre de la ruta debe tener maximo 100 caracteres")
    .run(req);

  await body("punto_origen_lat")
    .notEmpty().withMessage("El punto de origen latitud es obligatorio")
    .isFloat({ min: -90, max: 90 }).withMessage("El punto de origen latitud debe ser un número entre -90 y 90")
    .run(req);

  await body("punto_origen_lng")
    .notEmpty().withMessage("El punto de origen longitud es obligatorio")
    .isFloat({ min: -180, max: 180 }).withMessage("El punto de origen longitud debe ser un número entre -180 y 180")
    .run(req);

  await body("punto_destino_lat")
    .notEmpty().withMessage("El punto de destino latitud es obligatorio")
    .isFloat({ min: -90, max: 90 }).withMessage("El punto de destino latitud debe ser un número entre -90 y 90")
    .run(req);

  await body("punto_destino_lng")
    .notEmpty().withMessage("El punto de destino longitud es obligatorio")
    .isFloat({ min: -180, max: 180 }).withMessage("El punto de destino longitud debe ser un número entre -180 y 180")
    .run(req);

  await body("medio_transporte")
    .notEmpty().withMessage("El medio de transporte es obligatorio")
    .isIn(["bicicleta", "caminata", "transporte publico"]).withMessage("El medio de transporte debe ser 'bicicleta', 'caminata' o 'transporte publico'")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};
