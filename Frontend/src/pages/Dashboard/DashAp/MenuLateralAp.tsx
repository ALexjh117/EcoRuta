import { useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaRegCalendarCheck,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
// import logo from "../../../../../public/img/logodef.png";
import "../DashAp/style/MenuLateral.css";
import { useAuth } from "../../../contexts/AuthContext";

// Tipos de props que recibe el componente
interface MenuLateralProps {
  menuAbierto: boolean;
  toggleMenu: () => void;
  setContenidoActual: (contenido: string) => void;
}

// Estado de las secciones desplegables
interface OpenSectionState {
  participacion: boolean;
  gestion: boolean;
  otros: boolean;
}

export default function MenuLateral({
  menuAbierto,
  toggleMenu,
  setContenidoActual,
}: MenuLateralProps) {
  const [mostrarMenu, setMostrarMenu] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<OpenSectionState>({
    participacion: true,
    gestion: true,
    otros: true,
  });

  const { logout } = useAuth();

  // Alterna el menú desplegable del usuario
  const toggleDropdown = () => setMostrarMenu((prev) => !prev);

  // Alterna el estado de una sección
  const toggleSection = (section: keyof OpenSectionState) =>
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

  // Navegación interna
  const irAPerfil = () => {
    setContenidoActual("perfil");
    setMostrarMenu(false);
  };

  const irConfig = () => {
    setContenidoActual("config");
    setMostrarMenu(false);
  };

  return (
    <aside className={`barradash ${menuAbierto ? "mostrar" : "ocultar"}`}>
      {/* Header usuario */}
      <section className="Clogodash">
        <div className="UserHeaderInfo" onClick={toggleDropdown}>
          {/* <img src={avatar} alt="Usuario" className="avatardash" /> */}
          <span className="nombredash">Usuario</span>
        </div>

        <button className="subirdash" onClick={toggleMenu}>
          <FaTimes />
        </button>

        {mostrarMenu && (
          <div className="menudesplegabledash">
            <ul>
              <li className="opcionesm" onClick={irAPerfil}>
                Perfil
              </li>
              <li className="opcionesm" onClick={irConfig}>
                Configuración
              </li>
              <li className="opcionesm" onClick={logout}>
                Cerrar sesión
              </li>
            </ul>
          </div>
        )}
      </section>

      {/* Menú principal */}
      <nav className="menudash">
        <button
          onClick={() => setContenidoActual("userview")}
          className="opciondash"
        >
          <FaHome className="iconodash" /> Inicio
        </button>

        {/* Participación */}
        <div className="grupo-menu">
          <button
            className="tituloseccion"
            onClick={() => toggleSection("participacion")}
          >
            {openSection.participacion ? <FaChevronDown /> : <FaChevronRight />}{" "}
            Participación
          </button>

          {openSection.participacion && (
            <>
              <button
                onClick={() => setContenidoActual("mapa")}
                className="opciondash"
              >
                <FaListAlt className="iconodash" /> Mapa
              </button>

              <button
                onClick={() => setContenidoActual("aplicacion")}
                className="opciondash"
              >
                <FaRegCalendarCheck className="iconodash" /> Logros
              </button>
            </>
          )}
        </div>
      </nav>

      {/* <img src={logo} alt="Logo" className="logo-dashboard-general" /> */}
    </aside>
  );
}
