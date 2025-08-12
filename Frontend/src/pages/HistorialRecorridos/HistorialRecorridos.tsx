// src/components/HistorialRecorridos.tsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

interface RecorridoAPI {
  id_recorrido: number;
  id_ruta: number;
  fecha_recorrido: string;
  tiempo_ruta: string; // formato "HH:mm:ss" 
  km_recorridos: string | number;
  medio_transporte?: string;
  emisiones_ahorro_kg_co2?: number;
  emision_co2?: number;
  ruta?: {
    medio_transporte?: string;
  };
}

interface Recorrido {
  id: number;
  fecha: string;
  distanciaKm: number;
  tiempoMinutos: number;
  medioTransporte: string;
  emisionesAhorroKgCO2: number;
}

function convertirTiempoRutaATiempoMinutos(tiempo: string): number {
  const partes = tiempo.split(":");
  if (partes.length !== 3) return 0;
  const horas = Number(partes[0]);
  const minutos = Number(partes[1]);
  const segundos = Number(partes[2]);
  return horas * 60 + minutos + (segundos >= 30 ? 1 : 0);
}

const HistorialRecorridos: React.FC = () => {
  const [recorridos, setRecorridos] = useState<Recorrido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { usuario } = useAuth();

  // Mueve la función afuera del useEffect para poder llamarla desde el botón
  const fetchRecorridos = async () => {
    if (!usuario?.IdUsuario) {
      
      setError("No se pudo obtener el ID del usuario");
      
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userId = usuario.IdUsuario;
      console.log("Obteniendo recorridos para usuario:", userId);

      const response = await api.get<RecorridoAPI[]>(`/recorridos/usuario/${userId}`);

      console.log("Recorridos recibidos:", response.data);

      if (!response.data || response.data.length === 0) {
        setRecorridos([]);
        
        setLoading(false);
        return;
      }

      const recorridosTransformados: Recorrido[] = response.data.map((r) => {
        const medioTransporte =
          r.medio_transporte || r.ruta?.medio_transporte || "caminata";

        return {
          id: r.id_recorrido,
          fecha: r.fecha_recorrido,
          distanciaKm: Number(r.km_recorridos) || 0,
          tiempoMinutos: convertirTiempoRutaATiempoMinutos(r.tiempo_ruta),
          medioTransporte,
          emisionesAhorroKgCO2: Number(
            r.emisiones_ahorro_kg_co2 ?? r.emision_co2 ?? 0
          ),
        };
      });

      setRecorridos(recorridosTransformados);
      console.log("Recorridos en estado:", recorridosTransformados);

    } catch (err) {
      console.error("Error obteniendo recorridos:", err);
      setError("Error cargando recorridos");
    } finally {
      setLoading(false);
    }
  };

  // useEffect solo para cargar al montar
  useEffect(() => {
    fetchRecorridos();
  }, [usuario]);

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  if (recorridos.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        <h2>Historial de Recorridos</h2>
        <p>No tienes recorridos guardados aún. ¡Empieza a crear rutas para ver tu historial!</p>
        <button onClick={() => {
  console.log("Actualizar historial clickeado");
  fetchRecorridos();
}}>Actualizar historial</button>

      </div>
    );
  }

  const totalKm = recorridos.reduce(
    (acc, r) => acc + Number(r.distanciaKm || 0),
    0
  );
  const totalEmisiones = recorridos.reduce(
    (acc, r) => acc + Number(r.emisionesAhorroKgCO2 || 0),
    0
  );
  const puntos = recorridos.reduce(
    (acc, r) => acc + Number(r.distanciaKm || 0) * 10,
    0
  );

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Historial de Recorridos</h2>

      <div
        style={{
          marginBottom: 20,
          padding: 10,
          backgroundColor: "#e0f7fa",
          borderRadius: 8,
        }}
      >
        <p>
          <strong>Total kilómetros recorridos:</strong> {totalKm.toFixed(2)} km
        </p>
        <p>
          <strong>Emisiones de CO₂ ahorradas:</strong>{" "}
          {totalEmisiones.toFixed(2)} kg
        </p>
        <p>
          <strong>Puntos acumulados:</strong> {puntos.toFixed(0)}
        </p>
        <button onClick={fetchRecorridos}>Actualizar historial</button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#00796b", color: "white" }}>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>Fecha</th>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>
              Distancia (km)
            </th>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>Tiempo (min)</th>
            <th
              style={{ padding: 8, border: "1px solid #004d40", textTransform: "capitalize" }}
            >
              Medio
            </th>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>
              CO₂ ahorrado (kg)
            </th>
          </tr>
        </thead>
        <tbody>
          {recorridos.map((r) => (
            <tr key={r.id} style={{ textAlign: "center" }}>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>
         {new Date(r.fecha + "T00:00:00").toLocaleDateString("es-CO")}


              </td>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>
                {r.distanciaKm.toFixed(2)}
              </td>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>
                {r.tiempoMinutos}
              </td>
              <td
                style={{ padding: 8, border: "1px solid #004d40", textTransform: "capitalize" }}
              >
                {r.medioTransporte
                  .replace("_", " ")
                  .replace("transporte publico", "transporte público")}
              </td>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>
                {r.emisionesAhorroKgCO2.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HistorialRecorridos;
