import React, { useState } from "react";

import "../styles/navbar.css";
import RotatingText from "ReactBits/RotatingText/RotatingText";

interface NavbaraPProps {
  toggleMenu?: () => void; // opcional, si quieres usarlo luego
  setContenidoActual: React.Dispatch<React.SetStateAction<string>>;
  cerrarSesion: () => void;
}

const NavbaraP: React.FC<NavbaraPProps> = ({
  // toggleMenu,
  setContenidoActual,
  cerrarSesion,
}) => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const toggleDropdown = () => {
    setMostrarMenu((prev) => !prev);
  };

  const irAPerfil = () => {
    setContenidoActual("perfil");
    setMostrarMenu(false);
  };

  const irConfig = () => {
    setContenidoActual("configuracion");
    setMostrarMenu(false);
  };

  return (
    <>
  
    <header className="encabezadodash">
      


      <section className="usuariodash" style={{ position: "relative" }}>
       
        <span
          className="nombredash  titulo-dash"
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
          
        >
          
        Mi DashBoard
        </span>
         <RotatingText
            texts={['¡Disfruta!', '¡Explora!', '¡Divierte!', '¡Conecta!']}
            className="rotating-text-dash"
          />

        {mostrarMenu && (
          <div className="menudesplegabledash">
            <ul>
              <li onClick={irAPerfil}>Perfil</li>
              <li onClick={irConfig}>Configuración</li>
              <li onClick={cerrarSesion}>Cerrar sesión</li>
            </ul>
          </div>
        )}
      </section>
    </header>
    </>
  );
};

export default NavbaraP;
