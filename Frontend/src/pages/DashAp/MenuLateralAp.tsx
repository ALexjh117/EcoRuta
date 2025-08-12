import { useState } from "react";
import {
  FaHome,
  FaListAlt,
 
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaMap,
  FaTrophy,
  FaRoute,
  FaChartBar,
  FaUsers
} from "react-icons/fa";

interface MenuLateralProps {
  menuAbierto: boolean;
  toggleMenu: () => void;
  setContenidoActual: (contenido: string) => void;
}

interface OpenSectionState {
  participacion: boolean;
}

export default function MenuLateral({
  menuAbierto,
  toggleMenu,
  setContenidoActual,
}: MenuLateralProps) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [openSection, setOpenSection] = useState<OpenSectionState>({
    participacion: true,
  });

  const logout = () => {
    console.log("Cerrando sesión...");
  };

  const toggleDropdown = () => setMostrarMenu((prev) => !prev);
  const toggleSection = (section: keyof OpenSectionState) =>
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <>
      {/* Overlay para móvil */}
      {menuAbierto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
        backdrop-blur-xl border-r border-slate-700/50 shadow-2xl transition-all duration-300 z-50 overflow-hidden
        ${menuAbierto ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Efecto de brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
        
        {/* Header usuario */}
        <section className="relative p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/30">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-4 cursor-pointer group transition-all duration-200 hover:scale-105"
              onClick={toggleDropdown}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-blue-400/30">
                  A
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-lg">Admin</span>
                <span className="text-slate-400 text-sm">Administrador</span>
              </div>
              <FaChevronDown className={`text-slate-400 transition-transform duration-200 ${mostrarMenu ? 'rotate-180' : ''}`} />
            </div>
            <button
              className="text-slate-400 hover:text-white transition-all duration-200 hover:rotate-90 hover:scale-110
              p-2 rounded-lg hover:bg-slate-700/50"
              onClick={toggleMenu}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Dropdown del usuario */}
          <div className={`transition-all duration-300 overflow-hidden ${mostrarMenu ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="bg-slate-800/50 rounded-xl p-2 backdrop-blur-sm border border-slate-700/30">
              <ul className="space-y-1">
                <li
                  className="flex items-center gap-3 hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer 
                  transition-all duration-200 text-slate-300 hover:text-white group"
                  onClick={() => setContenidoActual("perfil")}
                >
                  <FaUser className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>Perfil</span>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer 
                  transition-all duration-200 text-slate-300 hover:text-white group"
                  onClick={() => setContenidoActual("config")}
                >
                  <FaCog className="text-slate-400 group-hover:scale-110 transition-transform group-hover:rotate-90" />
                  <span>Configuración</span>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-red-500/20 p-3 rounded-lg cursor-pointer 
                  transition-all duration-200 text-slate-300 hover:text-red-400 group border-t border-slate-700/30 mt-2 pt-2"
                  onClick={logout}
                >
                  <FaSignOutAlt className="text-red-400 group-hover:scale-110 transition-transform" />
                  <span>Cerrar sesión</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
<br />
        {/* Menú principal */}
       {/* Menú principal */}
<nav className="p-6 flex-1 overflow-y-auto space-y-8">
  {/* Botón de inicio */}
  <button
    onClick={() => setContenidoActual("userview")}
    className="flex items-center gap-4 w-full py-4 px-5 rounded-xl hover:bg-slate-700/50 text-slate-300 
    hover:text-black transition-all duration-200 group border border-transparent hover:border-slate-600/30"
  >
    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 group-hover:scale-110 transition-all">
      <FaHome className="w-5 h-5" />
    </div>
    <span className="font-medium">Inicio</span>
  </button>
  <br />

  {/* Sección Participación */}
  <div className="space-y-4">
    <button
      className="flex items-center justify-between w-full py-4 px-5 rounded-xl hover:bg-slate-700/50 
      text-slate-300 hover:text-black transition-all duration-200 group border border-transparent hover:border-slate-600/30"
      onClick={() => toggleSection("participacion")}
    >
      <span className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 group-hover:scale-110 transition-all">
          {openSection.participacion ? (
            <FaChevronDown className="w-5 h-5" />
          ) : (
            <FaChevronRight className="w-5 h-5" />
          )}
        </div>
        <span className="font-medium">Participación</span>
      </span>
    </button>

    {/* Submenú */}
    <div
      className={`transition-all duration-300 overflow-hidden ${
        openSection.participacion
          ? "max-h-96 opacity-100 mt-2"
          : "max-h-0 opacity-0"
      }`}
    >
      <div className="ml-6 space-y-3">
        <button
          onClick={() => setContenidoActual("mapa")}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-slate-700/30 text-slate-400 
          hover:text-black transition-all duration-200 group"
        >
          <FaMap className="text-green-400 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Mapa</span>
        </button>

        <button
          onClick={() => setContenidoActual("recompensas")}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-slate-700/30 text-slate-400 
          hover:text-black transition-all duration-200 group"
        >
          <FaTrophy className="text-yellow-400 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Logros</span>
        </button>

        <button
          onClick={() => setContenidoActual("historialrecorridos")}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-slate-700/30 text-slate-400 
          hover:text-black transition-all duration-200 group"
        >
          <FaRoute className="text-orange-400 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Recorridos</span>
        </button>

        <button
          onClick={() => setContenidoActual("adminreports")}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-slate-700/30 text-slate-400 
          hover:text-black transition-all duration-200 group"
        >
          <FaChartBar className="text-cyan-400 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Reportes</span>
        </button>

        <button
          onClick={() => setContenidoActual("adminusers")}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-slate-700/30 text-slate-400 
          hover:text-black transition-all duration-200 group"
        >
          <FaUsers className="text-indigo-400 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Usuarios</span>
        </button>

        <button
          onClick={() => setContenidoActual("adminroutes")}
          className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-slate-700/30 text-slate-400 
          hover:text-black transition-all duration-200 group"
        >
          <FaListAlt className="text-pink-400 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Rutas</span>
        </button>
      </div>
    </div>
  </div>
</nav>


        {/* Footer con gradiente */}
        <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-700/20">
          <div className="text-center text-slate-500 text-xs">
            <p>Admin Dashboard v2.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}