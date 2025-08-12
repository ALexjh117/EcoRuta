// src/components/Admin/AdminReports.tsx
import React, { useState } from "react";
import { FileText, FileSpreadsheet } from "lucide-react";

const AdminReports: React.FC = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const downloadFile = async (
    url: string,
    filename: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    <div className="flex justify-center items-center w-screen">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-5 text-gray-800 dark:text-gray-100 text-center">
          📊 Reportes Administrativos
        </h1>

        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              downloadFile("/admin/reports/pdf", "usuarios_report.pdf", setLoadingPdf)
            }
            disabled={loadingPdf}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5" />
            {loadingPdf ? "Generando PDF..." : "Reporte PDF de Usuarios"}
          </button>

          <button
            onClick={() =>
              downloadFile("/admin/reports/excel", "rutas_report.xlsx", setLoadingExcel)
            }
            disabled={loadingExcel}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-5 h-5" />
            {loadingExcel ? "Generando Excel..." : "Reporte Excel de Rutas"}
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Descarga los reportes en el formato deseado.
        </p>
      </div>
    </div>
  );
};

export default AdminReports;
