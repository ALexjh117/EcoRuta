// src/components/AdminUsers.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Users, Loader2 } from "lucide-react";

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
}

const AdminUsers: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchUsuarios = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users", {
        params: { page: pageNumber, limit: perPage },
      });
      setUsuarios(res.data.users);
      setTotal(res.data.total);
      setPage(res.data.page);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios(page);
  }, [page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-6xl mx-auto w-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Gestión de Usuarios
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Cargando usuarios...
          </span>
        </div>
      ) : (
        <>
          {/* Tabla */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Apellido</th>
                  <th className="px-4 py-3">Correo</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr
                    key={u.id_usuario}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3">{u.id_usuario}</td>
                    <td className="px-4 py-3">{u.nombre}</td>
                    <td className="px-4 py-3">{u.apellido}</td>
                    <td className="px-4 py-3">{u.correo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ⬅ Anterior
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-300">
              Página {page} de {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Siguiente ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsers;
