import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import type { UsuarioAutenticado } from "./AuthContext";


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const usuarioLocal = localStorage.getItem("usuario");
        if (usuarioLocal) {
          setUsuario(JSON.parse(usuarioLocal));
        } else {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          setUsuario(decoded);
        }
      } catch (err) {
        console.error("Token o usuario inválido", err);
        setUsuario(null);
      }
    }
  }, [token]);

  const login = (nuevoToken: string, usuarioData: UsuarioAutenticado) => {
    localStorage.setItem("token", nuevoToken);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    setToken(nuevoToken);
    setUsuario(usuarioData);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUsuario(null);
    navigate("/iniciosesion");
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
