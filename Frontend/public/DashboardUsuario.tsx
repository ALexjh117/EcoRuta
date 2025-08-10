import { useState, useEffect } from "react";


import { useNavigate } from "react-router-dom";

// Componentes
import MenuLateralAp from "../src/pages/Dashboard/DashAp/MenuLateralAp";
import NavbaraP from "../src/pages/Dashboard/DashAp/NavbarAp";

import RoutePlanner from "../src/components/RoutePlanner";
import UserView from "../src/pages/userview/UserView";
import type { Usuario as UsuarioCompleto } from "../src/pages/userview/UserView";

// Estilos

import "../src/pages/Dashboard/styles/BotHp.css"
import "../src/pages/Dashboard/styles/ColaViento.css"
import "../src/pages/Dashboard/styles/Resposive.css"
import "../src/pages/Dashboard/styles/fondo.css"
import "../src/pages/Dashboard/styles/global.css"

import "../public/style/Dash.css"
// Props para NavbaraP (si decides modificar el componente para recibirlas)

export default function DashBoard(): JSX.Element {
  const [menuAbierto, setMenuAbierto] = useState<boolean>(true);
  const [contenidoActual, setContenidoActual] = useState<string>("userview");
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);

  const navigate = useNavigate();

  const cerrarSesion = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("IdUsuario");
    navigate("/");
  };

  useEffect(() => {
    setUsuario({
      IdUsuario: 1,
      Nombre: "Usuario Demo",
      Apellido: "Demo",
      Telefono: "000000000",
      Correo: "demo@mail.com",
      rol: {
        NombreRol: "Admin",
      },
    });
  }, []);

  return (
    <section className="contenedordash">
    
     
      <MenuLateralAp
        menuAbierto={menuAbierto}
        toggleMenu={() => setMenuAbierto(!menuAbierto)}
        setContenidoActual={setContenidoActual}
      />

      <main className="contenidodash">
        {/* Pasamos las props a NavbaraP */}
        <NavbaraP
          toggleMenu={() => setMenuAbierto(!menuAbierto)}
          setContenidoActual={setContenidoActual}
          cerrarSesion={cerrarSesion}
        />

        {contenidoActual === "mapa" && <RoutePlanner />}

        {contenidoActual === "userview" && (
          <UserView usuario={usuario} setContenidoActual={setContenidoActual} />
        )}
      </main>
    </section>
  );
}
