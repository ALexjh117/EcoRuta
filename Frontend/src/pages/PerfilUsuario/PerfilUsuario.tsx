// src/components/PerfilUsuario.tsx
import React, { useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  nivelActividad: number;
  // otros campos si tienes
}

const datosEjemplo: Usuario = {
  id: 1,
  nombre: "Juan Pérez",
  email: "juan.perez@example.com",
  nivelActividad: 3,
};

const PerfilUsuario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>(datosEjemplo);
  const [editable, setEditable] = useState(false);
  const [nombre, setNombre] = useState(usuario.nombre);

  const guardarCambios = () => {
    // Aquí iría llamada al backend para guardar
    setUsuario((u) => ({ ...u, nombre }));
    setEditable(false);
    alert("Cambios guardados (simulado)");
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Perfil de Usuario</h2>

      <div style={{ marginBottom: 15 }}>
        <label>
          <strong>Nombre:</strong>
          {editable ? (
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ marginLeft: 10, padding: 5, width: "70%" }}
            />
          ) : (
            <span style={{ marginLeft: 10 }}>{usuario.nombre}</span>
          )}
        </label>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>
          <strong>Email:</strong>
          <span style={{ marginLeft: 10 }}>{usuario.email}</span>
        </label>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>
          <strong>Nivel de actividad:</strong>
          <span style={{ marginLeft: 10 }}>{usuario.nivelActividad}</span>
        </label>
      </div>

      {editable ? (
        <div>
          <button onClick={guardarCambios} style={{ marginRight: 10 }}>
            Guardar
          </button>
          <button onClick={() => setEditable(false)}>Cancelar</button>
        </div>
      ) : (
        <button onClick={() => setEditable(true)}>Editar perfil</button>
      )}
    </div>
  );
};

export default PerfilUsuario;
