// src/components/HistorialRecorridos.tsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

interface RecorridoAPI {
  id_recorrido: number;
  id_ruta: number;
  fecha_recorrido: string;
  tiempo_ruta: string;
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

  const fetchRecorridos = async () => {
    if (!usuario?.IdUsuario) {
      setError("No se pudo obtener el ID del usuario");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get<RecorridoAPI[]>(`/recorridos/usuario/${usuario.IdUsuario}`);
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
          emisionesAhorroKgCO2: Number(r.emisiones_ahorro_kg_co2 ?? r.emision_co2 ?? 0),
        };
      });

      setRecorridos(recorridosTransformados);
    } catch (err) {
      console.error(err);
      setError("Error cargando recorridos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecorridos();
  }, [usuario]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-lg font-semibold">Cargando historial...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  const totalKm = recorridos.reduce((acc, r) => acc + r.distanciaKm, 0);
  const totalEmisiones = recorridos.reduce((acc, r) => acc + r.emisionesAhorroKgCO2, 0);
  const puntos = recorridos.reduce((acc, r) => acc + r.distanciaKm * 10, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 "  >
      <div className="max-w-9xl w-screen ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Historial de Recorridos</h2>

        {recorridos.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-md text-center ">
            <p className="text-gray-600 mb-4">No tienes recorridos guardados aún. ¡Empieza a crear rutas para ver tu historial!</p>
            <button
              onClick={fetchRecorridos}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
            >
              Actualizar historial
            </button>
          </div>
        ) : (
          <>
            {/* Tarjetas estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <p className="text-gray-500">Total kilómetros</p>
                <p className="text-2xl font-bold text-emerald-600">{totalKm.toFixed(2)} km</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <p className="text-gray-500">CO₂ ahorrado</p>
                <p className="text-2xl font-bold text-green-600">{totalEmisiones.toFixed(2)} kg</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <p className="text-gray-500">Puntos</p>
                <p className="text-2xl font-bold text-yellow-500">{puntos.toFixed(0)}</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={fetchRecorridos}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
              >
                Actualizar historial
              </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
              <table className="w-full border-collapse">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Fecha</th>
                    <th className="p-3 text-center">Distancia (km)</th>
                    <th className="p-3 text-center">Tiempo (min)</th>
                    <th className="p-3 text-center">Medio</th>
                    <th className="p-3 text-center">CO₂ ahorrado (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {recorridos.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3">{new Date(r.fecha + "T00:00:00").toLocaleDateString("es-CO")}</td>
                      <td className="p-3 text-center">{r.distanciaKm.toFixed(2)}</td>
                      <td className="p-3 text-center">{r.tiempoMinutos}</td>
                      <td className="p-3 text-center capitalize">
                        {r.medioTransporte.replace("_", " ").replace("transporte publico", "transporte público")}
                      </td>
                      <td className="p-3 text-center">{r.emisionesAhorroKgCO2.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistorialRecorridos;
