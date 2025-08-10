import React from "react";
import "./style/Recompensas.css";

interface Medalla {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string; // URL o nombre de icono
}

interface UsuarioRanking {
  id: number;
  nombre: string;
  puntos: number;
}

const medallasEjemplo: Medalla[] = [
  {
    id: 1,
    nombre: "Eco Explorador",
    descripcion: "Recorriste 50 km usando transporte sostenible",
    icono: "🌿",
  },
  {
    id: 2,
    nombre: "Camina Más",
    descripcion: "100 km caminando",
    icono: "🚶‍♂️",
  },
  {
    id: 3,
    nombre: "Amante de la bici",
    descripcion: "200 km en bicicleta",
    icono: "🚴‍♀️",
  },
];

const rankingEjemplo: UsuarioRanking[] = [
  { id: 1, nombre: "Ana", puntos: 1500 },
  { id: 2, nombre: "Luis", puntos: 1200 },
  { id: 3, nombre: "Carlos", puntos: 900 },
];

const Recompensas: React.FC = () => {
  const puntosActuales = 1250; // dato de ejemplo

  return (
    <div className="recompensas-container">
      <h2>Recompensas y Logros</h2>

      <div className="puntos-actuales">Puntos actuales: {puntosActuales}</div>

      <section className="medallas-section">
        <h3>Medallas Virtuales</h3>
        <div className="medallas-container">
          {medallasEjemplo.map((m) => (
            <div key={m.id} className="medalla-card">
              <div className="medalla-icono">{m.icono}</div>
              <strong className="medalla-nombre">{m.nombre}</strong>
              <p className="medalla-descripcion">{m.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ranking-section">
        <h3>Ranking de Usuarios</h3>
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rankingEjemplo.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>{u.nombre}</td>
                <td>{u.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Recompensas;
