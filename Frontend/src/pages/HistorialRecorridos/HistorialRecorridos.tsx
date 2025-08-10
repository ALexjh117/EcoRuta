// src/components/HistorialRecorridos.tsx
import React from "react";

interface Recorrido {
  id: number;
  fecha: string;
  distanciaKm: number;
  tiempoMinutos: number;
  medioTransporte: "bicicleta" | "caminata" | "transporte_publico";
  emisionesAhorroKgCO2: number;
}

const datosEjemplo: Recorrido[] = [
  {
    id: 1,
    fecha: "2025-08-01",
    distanciaKm: 5.2,
    tiempoMinutos: 25,
    medioTransporte: "bicicleta",
    emisionesAhorroKgCO2: 1.3,
  },
  {
    id: 2,
    fecha: "2025-08-02",
    distanciaKm: 2.5,
    tiempoMinutos: 40,
    medioTransporte: "caminata",
    emisionesAhorroKgCO2: 0.7,
  },
  {
    id: 3,
    fecha: "2025-08-03",
    distanciaKm: 10,
    tiempoMinutos: 50,
    medioTransporte: "transporte_publico",
    emisionesAhorroKgCO2: 2.1,
  },
];

const HistorialRecorridos: React.FC = () => {
  const recorridos = datosEjemplo;

  // Calcular totales
  const totalKm = recorridos.reduce((acc, r) => acc + r.distanciaKm, 0);
  const totalEmisiones = recorridos.reduce(
    (acc, r) => acc + r.emisionesAhorroKgCO2,
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
            <th style={{ padding: 8, border: "1px solid #004d40" }}>Distancia (km)</th>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>Tiempo (min)</th>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>Medio</th>
            <th style={{ padding: 8, border: "1px solid #004d40" }}>CO₂ ahorrado (kg)</th>
          </tr>
        </thead>
        <tbody>
          {recorridos.map((r) => (
            <tr key={r.id} style={{ textAlign: "center" }}>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>{r.fecha}</td>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>
                {r.distanciaKm.toFixed(2)}
              </td>
              <td style={{ padding: 8, border: "1px solid #004d40" }}>
                {r.tiempoMinutos}
              </td>
              <td style={{ padding: 8, border: "1px solid #004d40", textTransform: "capitalize" }}>
                {r.medioTransporte.replace("_", " ")}
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
