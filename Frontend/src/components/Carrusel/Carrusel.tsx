import React from "react";
import "./style/Carrusel.css";


// Tipos
interface Elemento {
  Imagen: string;
  NombreElemento: string;
  esPlaceholder?: boolean;
}

// Catálogo estático (local)
const imagenesLocales: Elemento[] = [
  { Imagen: "bicicleta-carrusel.jpg", NombreElemento: "Gengar" },
  { Imagen: "bus-animado.jpg", NombreElemento: "Greninja" },
  { Imagen: "caminar-carrusel.jpg", NombreElemento: "Danza" },
  { Imagen: "caminar.png", NombreElemento: "Parques" },
  { Imagen: "salud.jfif", NombreElemento: "Dominó" },
  { Imagen: "salud2.png", NombreElemento: "Juegos de Mesa" },
  { Imagen: "casquito.png", NombreElemento: "Sapo" },
  { Imagen: "viaje.avif", NombreElemento: "Logo SENA" },
];

const Carrusel: React.FC = () => {
  const itemsCarrusel: Elemento[] = [...imagenesLocales];
  
  return (
    <>
      <h1 className="texto-unico-elemento titulo-principal animate-bounce ">
        Sal a dar un paseo!
      </h1>

      <div className="body-alquiler-ap ">
        <div className="box ">
          {itemsCarrusel.map((img, index) => (
            <span
              key={index}
              style={{ "--i": index + 1 } as React.CSSProperties}
            >
              <img
                src={`/img/${img.Imagen}`}
                alt={img.NombreElemento}
                className="img-alquiler-catalogo"
              />
            </span>
          ))}
        </div>
      </div>

      <main className="bienvenida-bienestar">
        <div className="bienvenida-texto">
          <h2>¡Que esperas para salir de la zona de confour!</h2>

          <p className="ubicacion-destacada">
            📍 Compite con tigo mismo potencia tu salud , explora el mundo!
          </p>
        </div>
        <div className="bienvenida-imagen">
         
           
        </div>
      </main>
    </>
  );
};

export default Carrusel;
