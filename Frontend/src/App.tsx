import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import RoutePlanner from "./components/RoutePlanner";
import { AuthProvider } from "./contexts/AuthProvider";
import InicioSesion from "./components/InicioSesion";
import DashUsuario from "../public/DashboardUsuario";
import DashAdmin from "../public/DashboardAdmin"
import HistorialRecorridos from "./pages/HistorialRecorridos/HistorialRecorridos";
import Recompensas from "./pages/Recompensas/Recompensas";
import PerfilUsuario from "./pages/PerfilUsuario/PerfilUsuario";
import PanelAdministracion from "./pages/Admin/PanelAdministracion";
import Registrarse from './components/Registrar'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Se envuelve todo*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<RoutePlanner />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/dashusuario" element={<DashUsuario />} />

          <Route path="/historial" element={<HistorialRecorridos/>} />
          <Route path="/recompensas" element={<Recompensas/>} />
          <Route path="/perfilusuario" element={<PerfilUsuario/>} />
          <Route path="/adminperfiles" element={<PanelAdministracion/>} />
          <Route path="registrarse" element={<Registrarse />} />

            <Route path="/dashadmin" element={<DashAdmin />} />

           
                
                

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
