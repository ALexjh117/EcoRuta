// src/components/AdminUsers.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

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
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Apellido</th>
                <th className="border border-gray-300 p-2">Correo</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id_usuario} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{u.id_usuario}</td>
                  <td className="border border-gray-300 p-2">{u.nombre}</td>
                  <td className="border border-gray-300 p-2">{u.apellido}</td>
                  <td className="border border-gray-300 p-2">{u.correo}</td>
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

export default AdminUsers;
