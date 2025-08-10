// src/components/PanelAdministracion.tsx
import React, { useState, useEffect } from "react";
import { exportUsuariosAExcel } from "../../utils/exportExcel";
import { exportUsuariosAPdf } from "../../utils/exportPdf";
interface UsuarioAdmin {
  id: number;
  nombre: string;
  email: string;
  nivelActividad: number;
  estado: "activo" | "inactivo";
}

const usuariosEjemplo: UsuarioAdmin[] = [
  { id: 1, nombre: "Ana Gómez", email: "ana@example.com", nivelActividad: 4, estado: "activo" },
  { id: 2, nombre: "Luis Martínez", email: "luis@example.com", nivelActividad: 2, estado: "activo" },
  { id: 3, nombre: "Carla Torres", email: "carla@example.com", nivelActividad: 1, estado: "inactivo" },
  { id: 4, nombre: "Jorge Díaz", email: "jorge@example.com", nivelActividad: 3, estado: "activo" },
];

const PanelAdministracion: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>(usuariosEjemplo);
  const [filtro, setFiltro] = useState("");

  // Filtrar usuarios por nombre o email
  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      u.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Panel de Administración</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: 8, width: "100%", boxSizing: "border-box" }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#37474f", color: "white" }}>
            <th style={{ padding: 10, border: "1px solid #263238" }}>ID</th>
            <th style={{ padding: 10, border: "1px solid #263238" }}>Nombre</th>
            <th style={{ padding: 10, border: "1px solid #263238" }}>Email</th>
            <th style={{ padding: 10, border: "1px solid #263238" }}>Nivel Actividad</th>
            <th style={{ padding: 10, border: "1px solid #263238" }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id} style={{ textAlign: "center", backgroundColor: usuario.estado === "activo" ? "#e0f7fa" : "#ffcdd2" }}>
              <td style={{ padding: 10, border: "1px solid #263238" }}>{usuario.id}</td>
              <td style={{ padding: 10, border: "1px solid #263238" }}>{usuario.nombre}</td>
              <td style={{ padding: 10, border: "1px solid #263238" }}>{usuario.email}</td>
              <td style={{ padding: 10, border: "1px solid #263238" }}>{usuario.nivelActividad}</td>
              <td style={{ padding: 10, border: "1px solid #263238", textTransform: "capitalize" }}>{usuario.estado}</td>
            </tr>
          ))}
          {usuariosFiltrados.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 10, textAlign: "center" }}>
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
        <button onClick={() => exportUsuariosAExcel(usuariosFiltrados)} style={{ marginBottom: 15 }}>
  Exportar a Excel
</button>

<button onClick={() => exportUsuariosAPdf(usuariosFiltrados)} style={{ marginLeft: 10, marginBottom: 15 }}>
  Exportar a PDF
</button>

      </table>
    </div>
  );
};

export default PanelAdministracion;
