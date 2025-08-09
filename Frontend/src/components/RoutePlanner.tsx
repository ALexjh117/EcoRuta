//para este componente se uso leaflet una liberia de js que permite crear mapas iterativos para 
//paginas web
import React, { useState, useMemo } from "react";
// Importamos React y dos hooks importantes:
// useState para manejar estados internos del componente,
// useMemo para memorizar valores calculados y optimizar el rendimiento

import {
  MapContainer, // es el contenedor principal donde se renderiza el mapa
  TileLayer, //capa que carga los files o mosaicos
  Marker, // para mostrar marcadores o pines en el mapa con una posicion especifica
  useMapEvents, // hook para escuchar varios eventos que ocurren en el mapa , como clics,movimientos etc
  Polyline,//para dibujar lineas que unen varios puntos del mapa (rutas o caminos)
} from "react-leaflet";


import L from "leaflet"; // importamos la liberia baseleaflet en js puro, para poder
//hacer calculos que react-leaftlet no incluye directamente , como calcular distancias 
// entre coordenadas

import "leaflet/dist/leaflet.css";
// Importamos los estilos CSS necesarios para que Leaflet se vea bien
//esto es los necesarios para que el mapa

// Importación de imágenes para los iconos de los marcadores
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";// icono para las pantallas (alta resolucion)

import iconUrl from "leaflet/dist/images/marker-icon.png"; //icono estandar del marcador
import shadowUrl from "leaflet/dist/images/marker-shadow.png";//sombra que aparece debajo del icono

//elimina la funcion interna del leaflet usa para obtener rutas por defecto iconos
//bundlers o empaquetados son los que toman el codigo fuente y los recursos del proyecto
// y los empaqueta en unos pocos archivos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({//remplaza esas rutas por defecto con las imagenes importadas arriba 
// //asegurnandose que los marcadores se muestren correctamente
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// aqui guarda una tupla con dos numeros latitud y longitud
//latitud es el valor que indica que tan al norte o sur se encuentra algo
//esta posiciion corresponde a las coordenadas de Bogota , colombia puesss
// EL TIPO NUMBER INDICA QUE ES UN ARREGLO DE DOS NUMEROS ( PARA EL TIPADO)
const defaultPosition: [number, number] = [4.710989, -74.07209];



//aqui recibe una funcion llamanda onclick ya se conoce zunga , esta funcion es para recibir,
//la latitud y la longitud
function ClickHandler({
  onClick,
}: {
  onClick: (pos: [number, number]) => void;//void signigica que la funcion no devuelve ningun valor ,
  //simplemente ejecuta codigo o hace algo , pero no retorna nadaa
}) {
  // Usamos useMapEvents para escuchar eventos en el mapa
  useMapEvents({
    click(e) {
      // Cuando ocurre el clic, la función obtiene la posición (e.latlng.lat y e.latlng.lng)
      //  donde se hizo clic, y llama a onClick pasándole esas coordenadas como array.
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  // Este componente no renderiza nada visible
  return null;
}

// Componente principal RoutePlanner (Planificador de Rutas)
export default function RoutePlanner() {
  // Estado para guardar el origen: posición [lat, lng] o null si no hay origen
  const [origin, setOrigin] = useState<[number, number] | null>(null);

  // Estado para guardar el destino: posición [lat, lng] o null si no hay destino
  const [destination, setDestination] = useState<[number, number] | null>(null);

  // Estado para guardar el modo de transporte seleccionado:
  // Puede ser "bicicleta", "caminando", "publico" o null (ninguno seleccionado)
  const [modotransporte, setModoTransporte] = useState<
    "bicicleta" | "caminando" | "publico" | null
  >(null);

  ///funcion que recibe un parametro pos , es un arreglo con dos numeros , latitud y longitud
  //la funcion sera llamada cada vez que el usuario haga click en el mapa
  const handleMapClick = (pos: [number, number]) => {
    if (!origin) {
        // si aun no hay un punto de origen es null o falso

      // Si no hay origen, el primer clic establece el origen
      setOrigin(pos);
    } else if (!destination) {
      // Si ya hay origen pero no destino, el segundo clic establece el destino
      setDestination(pos);
    } else {
      /*Si ya existen tanto origen como destino, al hacer clic otra vez se reinicia la selección:
    Se asigna el nuevo clic como origen.
|Se limpia el destino (null) para que se pueda seleccionar de nuevo.*/
      setOrigin(pos);
      setDestination(null); // y limpiamos el destino para que se pueda seleccionar otro nuevo
    }
  };

  // decalramoa la varia distnace que sera el resultado memorizado de una funcion 
 // que calcula la distancia
  const distanceKm = useMemo(() => { //use memo hace que esta funcion solo se ejecute cuando,//cambien a origin//
    //solo calculamos la distancia si existen ambos puntos
    if (origin && destination) {

// creamos los objetos latlng de leaflet con la latitud y la longitud de origen y destino 
//leaflet usa objetos para para hacer calculos geograficos
      const from = L.latLng(origin[0], origin[1]);
      const to = L.latLng(destination[0], destination[1]);

      // Calculamos la distancia  en ambos puntos en metros y la convertimos a kilómetros con 2 decimales
      return (from.distanceTo(to) / 1000).toFixed(2);
    }
    // Si no hay ambos puntos, no hay distancia
    return null;
  }, [origin, destination]);
  // el array le dice a memo que solo se vuelba a ejecutar el calculo cuando cmabie alguno
  //de los dos estados

  return (
    // Contenedor principal con tamaño fijo para el mapa y controles
    <div style={{ height: "400px", width: "1000px" }}>
      {/* Contenedor del mapa */}
      <MapContainer
        center={defaultPosition} // posición inicial del mapa
        zoom={13} // nivel de zoom inicial
        style={{ height: "100%", width: "100%" }} // ocupar todo el tamaño del div padre
      >
        {/* Capa base de OpenStreetMap */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Componente que escucha clics en el mapa */}
        <ClickHandler onClick={handleMapClick} />

        {/* Marcador para el origen si está seleccionado */}
        {origin && <Marker position={origin} />}

        {/* Marcador para el destino si está seleccionado */}
        {destination && <Marker position={destination} />}

        {/* Línea azul que une origen y destino, si ambos están definidos */}
        {origin && destination && (
          <Polyline positions={[origin, destination]} color="blue" weight={5} />
        )}
      </MapContainer>

      {/* Sección para seleccionar el modo de transporte */}
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <strong>Modo de transporte:</strong> <br />
        {/* Botones que cambian el estado modotransporte */}
        <button
          onClick={() => setModoTransporte("caminando")}
          style={{
            backgroundColor: modotransporte === "caminando" ? "lightblue" : "",
          }}
        >
          Caminata 🚶‍♀️
        </button>
        <button
          onClick={() => setModoTransporte("bicicleta")}
          style={{
            backgroundColor: modotransporte === "bicicleta" ? "lightblue" : "",
            marginLeft: 8,
          }}
        >
          Bicicleta 🚴‍♂️
        </button>
        <button
          onClick={() => setModoTransporte("publico")}
          style={{
            backgroundColor: modotransporte === "publico" ? "lightblue" : "",
            marginLeft: 8,
          }}
        >
          Transporte público 🚌
        </button>
        {/* Texto que muestra qué modo está seleccionado */}
        <div>
          <strong>Transporte seleccionado:</strong>{" "}
          {modotransporte ? modotransporte : "Ninguno"}
        </div>
      </div>

      {/* Sección que muestra la información actual */}
      <div style={{ marginTop: 10 }}>
        <strong>Origen:</strong>{" "}
        {origin ? origin.join(", ") : "No seleccionado"} <br />
        <strong>Destino:</strong>{" "}
        {destination ? destination.join(", ") : "No seleccionado"} <br />
        {/* Si hay distancia, mostrarla */}
        {distanceKm && (
          <div>
            <strong>Distancia:</strong> {distanceKm} Km
          </div>
        )}
      </div>
    </div>
  );
}
