import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Registrarse.css";
import axios from "axios";


interface FormularioRegistro {
  identificacionUsuario: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  actividad_usuario: "alta" | "media" | "baja";
  tipo_rol: "Admin" | "Participante Rutas";
}

interface ErroresFormulario {
  [campo: string]: string;
}

const RegistroUsuario: React.FC = () => {
  const [formulario, setFormulario] = useState<FormularioRegistro>({
    identificacionUsuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    actividad_usuario: "media",
    tipo_rol: "Participante Rutas",
  });

  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error" | "">("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate(); //Descomentar esto, apra anvegar a lo uqe me registro

  const validarCampo = (nombre: keyof FormularioRegistro, valor: string) => {
    const nuevosErrores = { ...errores };

    switch (nombre) {
      case "identificacionUsuario":
        if (!valor) nuevosErrores[nombre] = "Campo obligatorio";
        else if (!/^\d{1,50}$/.test(valor))
          nuevosErrores[nombre] = "Debe contener solo números";
        else delete nuevosErrores[nombre];
        break;

      case "nombre":
      case "apellido":
        if (!valor) nuevosErrores[nombre] = "Campo obligatorio";
        else if (valor.length > 100)
          nuevosErrores[nombre] = "Máx 100 caracteres";
        else delete nuevosErrores[nombre];
        break;

      case "correo":
        if (!valor) nuevosErrores[nombre] = "Campo obligatorio";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
          nuevosErrores[nombre] = "Correo inválido";
        else delete nuevosErrores[nombre];
        break;

      case "contrasena":
        if (!valor) nuevosErrores[nombre] = "Campo obligatorio";
        else if (valor.length < 6)
          nuevosErrores[nombre] = "Mínimo 6 caracteres";
        else delete nuevosErrores[nombre];
        break;

      case "telefono":
        if (!valor) nuevosErrores[nombre] = "Campo obligatorio";
        else if (!/^\d{7,20}$/.test(valor))
          nuevosErrores[nombre] = "Teléfono inválido";
        else delete nuevosErrores[nombre];
        break;
    }

    setErrores(nuevosErrores);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    validarCampo(name as keyof FormularioRegistro, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);

    (Object.keys(formulario) as (keyof FormularioRegistro)[]).forEach((campo) => {
      validarCampo(campo, String(formulario[campo] ?? ""));
    });

    if (Object.keys(errores).length === 0) {
      try {
        const respuesta = await axios.post('http://localhost:3000/api/usuarios/', formulario)
        console.log('Respuesta backend: ', respuesta.data)

        setMensaje("✅ Registro exitoso.");
        setTipoMensaje("exito");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error al registrar:", error);
        setMensaje("❌ Error al registrar.");
        setTipoMensaje("error");
      }
    } else {
      setMensaje("❌ Corrige los errores e intenta nuevamente.");
      setTipoMensaje("error");
    }

    setCargando(false);
  };

  return (
    <div className="contenedor-registro">
    <div className="">
    <h2 className="title-login">Registro de Usuario</h2>
    <form className="formulario-registro" onSubmit={handleSubmit}>

      <div className="grupo-campo-registro">
        <label>Identificación*</label>
        <input
          type="text"
          name="identificacionUsuario"
          value={formulario.identificacionUsuario}
          onChange={handleChange}
          className="campo-input-registro"
        />
        {errores.identificacionUsuario && (
          <p className="mensaje-error-registro">{errores.identificacionUsuario}</p>
        )}
      </div>

      <div className="grupo-campo-registro">
        <label>Nombre*</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          className="campo-input-registro"
        />
        {errores.nombre && (
          <p className="mensaje-error-registro">{errores.nombre}</p>
        )}
      </div>

      <div className="grupo-campo-registro">
        <label>Apellido*</label>
        <input
          type="text"
          name="apellido"
          value={formulario.apellido}
          onChange={handleChange}
          className="campo-input-registro"
        />
        {errores.apellido && (
          <p className="mensaje-error-registro">{errores.apellido}</p>
        )}
      </div>

      <div className="grupo-campo-registro">
        <label>Correo*</label>
        <input
          type="email"
          name="correo"
          value={formulario.correo}
          onChange={handleChange}
          className="campo-input-registro"
        />
        {errores.correo && (
          <p className="mensaje-error-registro">{errores.correo}</p>
        )}
      </div>

      <div className="grupo-campo-registro">
        <label>Contraseña*</label>
        <input
          type="password"
          name="contrasena"
          value={formulario.contrasena}
          onChange={handleChange}
          className="campo-input-registro"
        />
        {errores.contrasena && (
          <p className="mensaje-error-registro">{errores.contrasena}</p>
        )}
      </div>

      <div className="grupo-campo-registro">
        <label>Teléfono*</label>
        <input
          type="tel"
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          className="campo-input-registro"
        />
        {errores.telefono && (
          <p className="mensaje-error-registro">{errores.telefono}</p>
        )}
      </div>

      <div className="grupo-campo-registro">
        <label>Nivel de actividad*</label>
        <select
          name="actividad_usuario"
          value={formulario.actividad_usuario}
          onChange={handleChange}
          className="campo-input-registro"
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      <div className="grupo-campo-registro">
        <label>Rol*</label>
        <select
          name="tipo_rol"
          value={formulario.tipo_rol}
          onChange={handleChange}
          className="campo-input-registro"
        >
          <option value="Admin">Administrador</option>
          <option value="Participante Rutas">Participante Rutas</option>
        </select>
      </div>

      <button type="submit" className="boton-registro" disabled={cargando}>
        {cargando ? "Registrando..." : "Registrarme"}
      </button>

      {mensaje && (
        <p className={tipoMensaje === "exito" ? "mensaje-exito" : "mensaje-error"}>
          {mensaje}
        </p>
      )}
    </form>
  </div>
  </div>
  );
};

export default RegistroUsuario;