// src/components/Admin/AdminRoutes.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Ruta {
  id_ruta: number;
  nombre_ruta: string;
  medio_transporte: string;
 
}

const AdminRoutes: React.FC = () => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchRutas = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await api.get("/admin/routes", {
        params: { page: pageNumber, limit: perPage },
      });
      setRutas(res.data.routes);
      setTotal(res.data.total);
      setPage(res.data.page);
    } catch (error) {
      console.error("Error cargando rutas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutas(page);
  }, [page]);

const totalPages = Math.ceil(total / perPage) || 1;


  return (
    <div className="p-6 bg-white rounded shadow max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Rutas</h1>

      {loading ? (
        <p>Cargando rutas...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
           <thead>
  <tr>
    <th>ID</th>
    <th>Nombre Ruta</th>
    <th>Medio Transporte</th>
  </tr>
</thead>
<tbody>
  {rutas.map((r) => (
    <tr key={r.id_ruta}>
      <td>{r.id_ruta}</td>
      <td>{r.nombre_ruta}</td>
      <td>{r.medio_transporte}</td>
    </tr>
  ))}
</tbody>

          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminRoutes;
