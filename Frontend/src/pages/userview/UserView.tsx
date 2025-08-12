import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
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

// Datos simulados de actividad semanal (puedes cambiar o traer datos reales)
const actividadSemanal = [
  { dia: "Lun", actividad: 3 },
  { dia: "Mar", actividad: 5 },
  { dia: "Mié", actividad: 2 },
  { dia: "Jue", actividad: 8 },
  { dia: "Vie", actividad: 6 },
  { dia: "Sáb", actividad: 4 },
  { dia: "Dom", actividad: 1 },
];

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

        if (!id) {
          console.error("Id de usuario no encontrado en el token");
          return;
        }

        const res = await axios.get(`http://localhost:3000/api/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
        <>
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
              <strong>Teléfono: </strong> {usuario.telefono || "No registrado"}
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

          {/* Aquí agregamos el gráfico de barras */}
          <div className="UserCuadro UserActividad">
            <h3>Actividad semanal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={actividadSemanal} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="actividad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </section>
  );
}
