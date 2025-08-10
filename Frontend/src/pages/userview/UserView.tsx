import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./styles/UserView.css";

export interface Rol {
  NombreRol: string;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  rol?: Rol;
  telefono?: string;
  correo: string;
}


interface UserViewProps {
  setContenidoActual: (contenido: string) => void;
}

export default function UserView({ setContenidoActual }: UserViewProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchUsuario = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const id = payload.id || payload.IdUsuario; // <-- corregido

    console.log("payload", payload);
    console.log("id", id);

    if (!id) {
      console.error("Id de usuario no encontrado en el token");
      return;
    }

    const res = await axios.get(`http://localhost:3000/api/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Respuesta usuario:", res.data);
setUsuario(res.data);

    setUsuario(res.data);
  } catch (error) {
    console.error("Error cargando usuario:", error);
  }
};

   
    fetchUsuario();
  }, []);

  return (
    <section className="UserContenedor">
      {!usuario ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="UserCuadro UserInfo">
          <h2 className="UserNombre">
            <strong>Nombre: </strong> {usuario.nombre}
          </h2>
          <p>
            <strong>Apellido: </strong> {usuario.apellido}
          </p>
          <p className="UserRol">
            <strong>Rol: </strong> {usuario?.rol?.NombreRol || "Sin rol"}
          </p>
          <p className="UserRol">
            <strong>Teléfono: </strong> {usuario.telefono}
          </p>
          <p className="UserCorreo">
            <strong>Correo Electrónico: </strong> {usuario.correo}
          </p>

          <button
            className="UserBoton"
            onClick={() => setContenidoActual("config")}
          >
            Editar perfil
          </button>
        </div>
      )}
    </section>
  );
}
