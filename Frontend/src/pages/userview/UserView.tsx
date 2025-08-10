
import "./styles/UserView.css";

export interface Rol {
  NombreRol: string;
}

export interface PerfilAprendiz {
  ProgramaFormacion: string;
  Ficha: string;
  Jornada: string;
}

export interface Usuario {
  IdUsuario: number;
  Nombre: string;
  Apellido: string;
  rol?: Rol;
  perfilAprendiz?: PerfilAprendiz;
  Telefono: string;
  Correo: string;
}

interface UserViewProps {
  usuario: Usuario | null;
  setContenidoActual: (contenido: string) => void;
}


export default function UserView({ usuario, setContenidoActual }: UserViewProps) {
  return (
    <section className="UserContenedor">
      {!usuario ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="UserCuadro UserInfo">
          {/* <img src={avatar} alt="Avatar" className="UserAvatar" /> */}
          <h2 className="UserNombre">
            <strong>Nombre: </strong>
            {usuario.Nombre} {usuario.Apellido}
          </h2>
          <p className="UserRol">
            <strong>Rol: </strong>
            {usuario?.rol?.NombreRol || "Sin rol"}
          </p>
          <p className="UserRol">
            <strong>Programa: </strong>
            {usuario?.perfilAprendiz?.ProgramaFormacion || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Ficha: </strong>
            {usuario?.perfilAprendiz?.Ficha || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Jornada: </strong>
            {usuario?.perfilAprendiz?.Jornada || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Teléfono: </strong>
            {usuario.Telefono}
          </p>
          <p className="UserCorreo">
            <strong>Correo Electrónico: </strong>
            {usuario.Correo}
          </p>
        {/*   <img src={logo} className="UserLogo" alt="Logo SENA" /> */}
          <button
            className="UserBoton"
            onClick={() => setContenidoActual("config")}
          >
            Editar perfil
          </button>
        </div>
      )}

      {/* Aquí mantienes la parte de lúdicas y eventos tal cual */}
    </section>
  );
}
