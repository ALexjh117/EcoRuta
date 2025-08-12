import React, { useState } from "react";
import { ChevronDown, LogOut, User, Settings, Menu } from "lucide-react";
import RotatingText from "ReactBits/RotatingText/RotatingText";

interface NavbaraPProps {
  toggleMenu?: () => void;
  setContenidoActual: React.Dispatch<React.SetStateAction<string>>;
  cerrarSesion: () => void;
}

const NavbaraP: React.FC<NavbaraPProps> = ({
  setContenidoActual,
  cerrarSesion,
}) => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const toggleDropdown = () => setMostrarMenu((prev) => !prev);

  return (
    <header className="bg-gray-900 text-white shadow-lg px-6 py-3 flex justify-between items-center relative">
      
      {/* Logo / Nombre Dashboard */}
      <div className="flex items-center gap-3">
        <Menu
          className="cursor-pointer lg:hidden"
          size={24}
          onClick={() => console.log("Abrir menú lateral")}
        />
        <div>
          <h1
            onClick={toggleDropdown}
            className="text-xl font-bold cursor-pointer hover:text-blue-400 transition flex items-center gap-1"
          >
            Mi Dashboard <ChevronDown size={18} />
          </h1>
          <RotatingText
            texts={["¡Disfruta!", "¡Explora!", "¡Divierte!", "¡Conecta!"]}
            className="text-sm text-blue-300"
          />
        </div>
      </div>

      {/* Dropdown */}
      {mostrarMenu && (
        <div className="absolute top-14 right-6 bg-white text-gray-800 rounded-xl shadow-xl w-52 overflow-hidden z-50">
          <ul>
            <li
              onClick={() => setContenidoActual("perfil")}
              className="px-5 py-3 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <User size={18} /> Perfil
            </li>
            <li
              onClick={() => setContenidoActual("configuracion")}
              className="px-5 py-3 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <Settings size={18} /> Configuración
            </li>
            <li
              onClick={cerrarSesion}
              className="px-5 py-3 hover:bg-red-50 text-red-500 flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={18} /> Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavbaraP;
