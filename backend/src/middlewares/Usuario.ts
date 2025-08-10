import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import {Usuarios} from '../models/Usuarios'

export const validateIdUsuario = async (req: Request, res: Response, next: NextFunction) =>{
    await param('id').isInt().withMessage("El ID deben ser numeros.")
    .custom(value => value > 0).withMessage("El ID no puede ser menor a 0.")
    .run(req)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return
    }
    next()
}


export const validateUsuarioExiste = async (req: Request, res: Response, next : NextFunction) =>{ 
    await body("identificacionUsuario").custom(async (valor) => {
        const usuarioExiste = await Usuarios.findOne({
            where : {IdentificacionUsuario: valor}
        })
        if (usuarioExiste) {
            throw new Error("El numero de identificacion ya esta registrado.")
        }
        return true
    })
    .run(req)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() })
    }

    next()
}

export const validateusuarioBody = async (req: Request, res: Response, next: NextFunction) =>{
    await body('nombre').notEmpty().withMessage('El nombre no puede estar vacio')
    .isLength({max: 100}).withMessage('El tamaño maximo es de 100 caracteres')
    .run(req)
 
    await body("apellido").notEmpty().withMessage("El apellido no puede estar vacio.")
    .isLength({max : 100}).withMessage("El tamano maximo es de 100 caracteres.")
    .run(req)


    await body('correo').notEmpty().withMessage('El correo no puede estar vacio')
    .isLength({max: 100}).withMessage('Demasiados caracteres para el correo')
    .custom( async (Valor) => {
        const correoExiste = await Usuarios.findOne({
            where: {correo: Valor}
        })
        if(correoExiste){
            throw new Error('El correo electronico ya esta registrado')
        }
        return true
    })
    .run(req)

    await body('telefono').notEmpty().withMessage('El telefono no puede estar vacio')
    .isLength({max: 20}).withMessage('Demasiados caracteres en telefonos')
    .isNumeric().withMessage('El telefono debe tener solo numeros')
    .run(req)

    await body('contrasena').notEmpty().withMessage('La contraseña no puede estar vacia')
    .isLength({max : 255}).withMessage('Contraseña demasiado larga')
    .run(req)

    await body("actividad_usuario")
    .isIn(['alta', 'media', 'baja'])
    .withMessage("Actividad usuario debe ser 'alta', 'media' o 'baja'.")
    .run(req);

    //Tner en cuenta la fecha de registro: Pendiente para saber si se borra de la base de datos.
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({error: errors.array()})
        return
    }
        next()
}