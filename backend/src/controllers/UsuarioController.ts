import type { Request, Response } from "express";
import Usuarios from "../models/Usuarios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RolUsuario from "../models/RolUsuario";

export class UsuarioController {
  static getAll = async (req: Request, res: Response) => {
    try {
      console.log("GET API/USER - OBTENER LOS USUARIOS");
      const usuarios = await Usuarios.findAll({
        order: [
          ["id_usuario", "ASC"], //Tner en cuenta si vamos a usar las fechas createdAt
        ],
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: "Ocurrio un error al obtener usuarios" });
    }
  };

  static getUserId = async (req: Request, res: Response) => {
    console.log("desde get id: /api/user");
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  /*static CrearUser = async (req: Request, res: Response) => {
    try {
      console.log(req.body);

      // Extraer la contraseña del cuerpo
      const { contrasena, ...otrosDatos } = req.body;

      // Hashear la contraseña
      const saltRounds = 10;
      const hash = await bcrypt.hash(contrasena, saltRounds);

      // Crear usuario con contraseña hasheada
      const usuario = new Usuarios({
        ...otrosDatos,
        contrasena: hash,
      });

      await usuario.save();

      res.status(201).json("USUARIO CREADO CORRECTAMENTE");
    } catch (error) {
      res.status(500).json({ error: "Ocurrio un error al crear usuario" });
      console.error(error);
    }
  };*/


  static CrearUser = async (req: Request, res:Response) => {
    console.log(req.body)
    try{
      const{
        nombre,
        apellido,
        identificacionUsuario,
        correo,
        contrasena, //CAMPOS DEL USUARIO QUE ESTAN EN EL FRONTEND
        telefono,
        fecha_registro,
        actividad_usuario,
        tipo_rol,
      } = req.body;

      if(
        !nombre ||
        !apellido ||
        !identificacionUsuario ||
        !correo || //Validacion de los campos
        !telefono ||
        !contrasena ||
      !tipo_rol ||
        !actividad_usuario
      ){
        res.status(400).json({ error: "Todos los campos son obligatorios" })
        return
      }
      const fechaRegistro = fecha_registro ? new Date(fecha_registro) : new Date();
      const existe = await Usuarios.findOne({ where: { correo } });
      if (existe) {
       res.status(409).json({ error: "El correo ya está registrado" });
       return
      }

      const saltRounds = 10
      const hash = await bcrypt.hash(contrasena, saltRounds); //Contraseña encryptada

      const usuario = await Usuarios.create({
        identificacionUsuario, //Creacion del nuevo usuario
        nombre,
        apellido,
        correo: correo.toLowerCase(),
        contrasena: hash,
        telefono,
        fecha_registro: fechaRegistro,
        actividad_usuario,
      });

      await RolUsuario.create({
        id_usuario:usuario.id_usuario,
        tipo_rol,
      })

      const { contrasena: _, ...datosUsuario } = usuario.toJSON();
      res.status(201).json({message: "Usuario registrado correctamente", usuario: datosUsuario});
    }catch(error){
      console.error('Error al crear el usuario:', error)
      res.status(500).json({error: "Error al crear el usuario"})
    }
  }

  static ActualizarUser = async (req: Request, res: Response) => {
    //console.log('desde update: /api/user')
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        const error = new Error("User no encontrado");
        return res.status(404).json({ error: error.message });
      }
      await usuario.update(req.body);
      res.json("Usuario Actualizado Correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al atualizar usuario" });
    }
  };
  static eliminarUserId = async (req: Request, res: Response) => {
    console.log("desde delete: /api/user");
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        const error = new Error("Usuarion no encontrado");
        return res.status(404).json({ error: error.message });
      }
      await usuario.destroy();
      res.json("Usuario eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al eliminar" });
    }
  };

  static loginUser = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      res.status(400).json({ error: "Correo y contraseña son obligatorios" });
      return;
    }

    try {
      const usuario = await Usuarios.findOne({
        where: { correo },
        include: ["roles"], // o el modelo Roles, según configuración
      });

      if (!usuario) {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        return;
      }

      const validPassword = await bcrypt.compare(
        contrasena,
        usuario.contrasena
      );
      if (!validPassword) {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        return;
      }

      const rolUsuario =
        usuario.roles && usuario.roles.length > 0
          ? usuario.roles[0].id_rol
          : null;

      const token = jwt.sign(
    { IdUsuario: usuario.id_usuario, rol: rolUsuario, nombre: usuario.nombre },
        process.env.JWT_SECRET || "clave_secreta",
        { expiresIn: "30d" }
      );

      res.json({
        token,
        usuario: {
          IdUsuario: usuario.id_usuario,
          IdRol: rolUsuario,
          Nombre: usuario.nombre,
          Apellido: usuario.apellido,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}
