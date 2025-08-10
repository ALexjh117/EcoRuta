// src/utils/exportExcel.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportUsuariosAExcel(usuarios: any[], nombreArchivo = "usuarios.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(usuarios);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, nombreArchivo);
}
