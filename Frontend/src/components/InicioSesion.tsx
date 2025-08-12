"use client";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useNavigate } from "react-router-dom";
import "./style/Inicio.css";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const IconoMail: React.FC = () => (
  <svg className="eco-icono-input-inicio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

const IconoCandado: React.FC = () => (
  <svg className="eco-icono-input-inicio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

interface DatosFormulario {
  correo: string;
  contrasena: string;
  recordarme: boolean;
}

interface Usuario {
  IdUsuario: number;
  IdRol: number;
  Nombre?: string;
}

interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export default function InicioSesion() {
  const [datosFormulario, setDatosFormulario] = useState<DatosFormulario>({
    correo: "",
    contrasena: "",
    recordarme: false,
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = evento.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      const response = await api.post<LoginResponse>("/usuarios/login", {
        correo: datosFormulario.correo,
        contrasena: datosFormulario.contrasena,
      });

      const { token, usuario } = response.data;
      
      console.log("usuario recibido", usuario);

const rol = Array.isArray(usuario.IdRol)? usuario.IdRol[0] :usuario.IdRol
      login(token, {
        IdUsuario: usuario.IdUsuario,
        Nombre: usuario.Nombre ?? "",
        rol: rol,
      });
      
      localStorage.setItem("usuarioId", usuario.IdUsuario.toString());
      setMensaje("Inicio de sesión exitoso");
      setTipoMensaje("exito");

      setTimeout(() => {
        if (rol === 1) {
          navigate("/dashadmin"); // Admin
        } else if (rol === 6) {
          navigate("/dashusuario"); // Usuario
        }
      }, 1200);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje(" Usuario o contraseña incorrectos");
      setTipoMensaje("error");
    } finally {
      setCargando(false);
    }
  };

  //Consumo de la Api(google) para loguearse en la app de ecoruta
  const googleLogin = async (id_token: string) => {
    try{
      const responseLogin = await api.post('http://localhost:3000/api/usuarios/login-google', {token: id_token})
      const {token, usuario} = responseLogin.data
      console.log('Usuario Google:', usuario)
      localStorage.setItem('token', token)
    }catch(error){
      console.error('Error con el login:', error)
    }
  }

  return (
    <>
      <h1 className="eco-titulo-inicio-sesion">¡Bienvenido a Eco Ruta!</h1>
      <form className="eco-formulario-inicio-sesion" onSubmit={manejarEnvio}>
        <div className="eco-grupo-campo-inicio">
          <label htmlFor="correo-inicio" className="eco-etiqueta-inicio eco-etiqueta-inicio-desktop">
            Correo Electrónico
          </label>
          <div className="eco-contenedor-input-inicio">
            <IconoMail />
            <input
              id="correo-inicio"
              name="correo"
              type="email"
              placeholder="tu@email.com"
              className="eco-campo-input-inicio"
              value={datosFormulario.correo}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>

        <div className="eco-grupo-campo-inicio">
          <label htmlFor="contrasena-inicio" className="eco-etiqueta-inicio eco-etiqueta-inicio-desktop">
            Contraseña
          </label>
          <div className="eco-contenedor-input-inicio">
            <IconoCandado />
            <input
              id="contrasena-inicio"
              name="contrasena"
              type="password"
              placeholder="••••••••"
              className="eco-campo-input-inicio"
              value={datosFormulario.contrasena}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>

        <div className="eco-contenedor-opciones-inicio eco-contenedor-opciones-inicio-desktop">
          <label className="eco-etiqueta-checkbox-inicio">
            <input
              type="checkbox"
              name="recordarme"
              className="eco-checkbox-inicio"
              checked={datosFormulario.recordarme}
              onChange={manejarCambio}
            />
            <span className="eco-texto-checkbox-inicio">Recordarme</span>
          </label>
          <a href="#" className="eco-enlace-recuperar-inicio">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <br />
        <a href="#" className="eco-enlace-registro">
          ¿No tienes cuenta? ¡Regístrate aquí!
        </a>

        <br />
        <br />
        <button type="submit" className="eco-boton-inicio-sesion" disabled={cargando}>
          {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        {mensaje && (
          <p
            className={`eco-mensaje-${tipoMensaje}`}
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            {mensaje}
          </p>
        )}
      <GoogleLogin onSuccess={(credencialRespuesta: CredentialResponse) => { //Componente de google para el btn
        if(credencialRespuesta.credential){
          googleLogin(credencialRespuesta.credential)
        }
        navigate('/dashusuario')
      }}onError={() => {
        console.log('Fallo el Registro con el Login')
      }}/>

      </form>
    </>
  );
}
