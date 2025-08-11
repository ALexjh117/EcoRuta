// src/components/Admin/AdminReports.tsx
import React, { useState } from "react";

const AdminReports: React.FC = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const downloadFile = async (url: string, filename: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, //guardar el token 
        },
      });
      if (!response.ok) throw new Error("Error al descargar archivo");

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      alert("Error al descargar el archivo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reportes Administrativos</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => downloadFile("/admin/reports/pdf", "usuarios_report.pdf", setLoadingPdf)}
          disabled={loadingPdf}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loadingPdf ? "Generando PDF..." : "Descargar reporte PDF de Usuarios"}
        </button>

        <button
          onClick={() => downloadFile("/admin/reports/excel", "rutas_report.xlsx", setLoadingExcel)}
          disabled={loadingExcel}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loadingExcel ? "Generando Excel..." : "Descargar reporte Excel de Rutas"}
        </button>
      </div>
    </div>
  );
};

export default AdminReports;
