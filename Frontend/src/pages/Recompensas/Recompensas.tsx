import React, { useEffect, useState } from "react";
import api from "../../services/api"; 
import "./style/Recompensas.css";

interface Medalla {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
}

interface Usuario {
  Nombre: string;
  Apellido: string;
  // otros campos por si la s moscas
}

interface UsuarioRanking {
  id_usuario: number;
  total_puntos: string;  // string ? toca mirar eso 
  usuario: Usuario;
  medalla: string;
}
const medallasDisponibles: Medalla[] = [
  { id: 1, nombre: "Oro", descripcion: "Medalla Oro", icono: "/img/oro.png" }, 
  { id: 2, nombre: "Plata", descripcion: "Medalla Plata", icono: "/img/plata.png" },
  { id: 3, nombre: "Bronce", descripcion: "Medalla Bronce", icono: "/img/bronce.png" },
];

const Recompensas: React.FC = () => {
  const [ranking, setRanking] = useState<UsuarioRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
  const cargarRanking = async () => {
    try {
      const response = await api.get<UsuarioRanking[]>("/sistemalogros/ranking");
          console.log("Datos del ranking:", response.data);
      setRanking(response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error al cargar ranking:", err.message);
      } else {
        console.error("Error desconocido", err);
      }
      setError("No se pudo cargar el ranking. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  cargarRanking();
}, []);


  
  if (loading) return <div>Cargando recompensas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="recompensas-container">
      <h2>Recompensas y Logros</h2>

      <div className="puntos-actuales">
        Puntos actuales: {ranking.length > 0 ? ranking[0].total_puntos : 0}
      </div>

      <section className="ranking-section">
        <h3>Ranking de Usuarios</h3>
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Puntos</th>
              <th>Medalla</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((u, index) => (
              <tr key={u.id_usuario}>
                <td>{index + 1}</td>
                <td>{u.usuario.Nombre} {u.usuario.Apellido}</td>

                <td>{u.total_puntos}</td>
              <td>
  {(() => {
    const medalla = medallasDisponibles.find(m => m.nombre === u.medalla);
    return medalla ? (
     <img
  src={medalla.icono}
  alt={medalla.descripcion}
  style={{ width: 60, height: 90 }}
/>

    ) : (
      "Sin medalla"
    );
  })()}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Recompensas;
