import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import RoutePlanner from "./components/RoutePlanner";
import { AuthProvider } from "./contexts/AuthProvider";
import InicioSesion from "./components/InicioSesion";
import DashUsuario from "../public/DashboardUsuario";
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
