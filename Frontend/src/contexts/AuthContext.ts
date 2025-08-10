import { createContext, useContext } from "react";

export interface UsuarioAutenticado {
  IdUsuario: number;
  Nombre: string;
  rol: number;
  [key: string]: unknown;
}

export interface AuthContextType {
  token: string | null;
  usuario: UsuarioAutenticado | null;
  login: (nuevoToken: string, usuarioData: UsuarioAutenticado) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook para consumir el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
