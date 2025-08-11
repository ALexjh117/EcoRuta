// middlewares/auth.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuarios";

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuarios;
      usuarioRol?: number | string | null;
      usuarioId?: number | null;
    }
  }
}

interface JwtPayload {
  id?: number;
  rol?: number | string;
  iat?: number;
  exp?: number;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado (no token)" });
    }

    const token = bearer.split(" ")[1];
    const secret = process.env.JWT_SECRET || "clave_secreta";

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, secret) as JwtPayload;
    } catch {
      return res.status(401).json({ error: "Token no válido o expirado" });
    }

    if (!decoded.id && !(decoded as any).IdUsuario) {
  return res.status(401).json({ error: "Token sin Id de usuario" });
}

req.usuarioId = decoded.id || (decoded as any).IdUsuario;
req.usuarioId = decoded.id || (decoded as any).IdUsuario;
req.usuarioRol = decoded.rol ?? null;


    try {
      const usuario = await Usuarios.findByPk(decoded.id, {
        attributes: ["id_usuario", "nombre", "apellido", "correo"],
      });
      if (usuario) req.usuario = usuario;
    } catch (e) {
      console.warn("authenticate: no se pudo cargar usuario desde DB", e);
    }

    next();
  } catch (error) {
    console.error("authenticate error:", error);
    res.status(500).json({ error: "Error interno autenticación" });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const roleFromToken = req.usuarioRol ?? (req.usuario ? (req.usuario as any).rol : null);

  const isAdmin =
    roleFromToken === 1 ||
    roleFromToken === "1" ||
    roleFromToken === "admin" ||
    roleFromToken === "ADMIN" ||
    roleFromToken === "Admin";

  if (!isAdmin) {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};
