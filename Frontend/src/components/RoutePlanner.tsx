//para este componente se uso leaflet una liberia de js que permite crear mapas iterativos para 
//paginas web
import  { useState, useMemo } from "react";
// Importamos React y dos hooks importantes:
// useState para manejar estados internos del componente,
// useMemo para memorizar valores calculados y optimizar el rendimiento

//importar css para las rutas 
import "./style/RoutePlanner.css"
//importamos api
import api from '../services/api'


import { useAuth } from "../contexts/AuthContext"; 
// Pon aquí la ruta real donde esté tu contexto de autenticación


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


/// Creamos un icono personalizado para los marcadores usando las imágenes importadas,
// con tamaños y anclas configuradas para que se vean correctamente en el mapa.
const customIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41], //tamaño del icono
  iconAnchor: [12, 41], //Punto del icono que estará en la posición (la "punta" del marcador)
  popupAnchor: [1, -34],//Posición donde se muestra el popup respecto al icono
  shadowSize: [41, 41],  //tamaño de la sombra debajo del icono
});

// aqui guarda una tupla con dos numeros latitud y longitud(tupla fijo numero de elementos especificos)
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
      return parseFloat((from.distanceTo(to) / 1000).toFixed(2));
    }
    // Si no hay ambos puntos, no hay distancia
    return null;
  }, [origin, destination]);
  // el array le dice a memo que solo se vuelba a ejecutar el calculo cuando cmabie alguno
  //de los dos estados


  const { usuario } = useAuth(); // user tendría info como id, nombre, etc.

const factoresEmision:{[key:string]:number}={
  caminata :0,
  bicicleta :0,
  "transporte publico":0.05,
}

  const id_usuario = usuario?.IdUsuario;

const handleGuardarRecorrido = async () => {

  
  if (!origin || !destination || !modotransporte) {
    alert("Debes seleccionar origen, destino y modo de transporte");
    return;
  }

  // Mapeo correcto de los valores del frontend a la base de datos
  const mapeoTransporte = {
    "caminando": "caminata",        // Frontend -> Base de datos
    "bicicleta": "bicicleta",       // Se mantiene igual
    "publico": "transporte publico"  // Frontend -> Base de datos
  };
const factor =factoresEmision[mapeoTransporte[modotransporte]]??0;
  const emisionCo2Calculadas=distanceKm?distanceKm *factor:0
  try {
    const { data: ruta } = await api.post("/rutas/obtener-o-crear", {
      id_usuario,
      nombre_ruta: "Ruta desde app",
      punto_origen_lat: origin[0],
      punto_origen_lng: origin[1],
      punto_destino_lat: destination[0],
      punto_destino_lng: destination[1],
      medio_transporte: mapeoTransporte[modotransporte], // Usar el mapeo
    });

    const fecha = new Date().toISOString().split("T")[0];
    const tiempo_ruta = "00:30:00"; // Puedes ajustar este valor

    await api.post("/recorridos", {
      id_ruta: ruta.id_ruta,
      fecha_recorrido: fecha,
      tiempo_ruta,
      id_usuario,

      medio_transporte:mapeoTransporte[modotransporte],
      km_recorridos: distanceKm,
      emision_co2: emisionCo2Calculadas,
    });

    alert("Recorrido guardado con éxito");
    setOrigin(null);
    setDestination(null);
    setModoTransporte(null);
  } catch (error) {
    console.error("Error guardando recorrido:", error);
    alert("Error al guardar recorrido");
  }
};

 

  return (
  <div className="div-ruta-container">
    <MapContainer
      center={defaultPosition}
      zoom={13}
      className="div-ruta-map"
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onClick={handleMapClick} />

      {origin && <Marker position={origin}  icon={customIcon}/>}
      {destination && <Marker position={destination} icon={customIcon}/>}

      {origin && destination && (
        <Polyline positions={[origin, destination]} color="blue" weight={5} />
      )}
    </MapContainer>

    <div className="div-ruta-modo-transporte" style={{ marginTop: 10, marginBottom: 10 }}>
      <strong>Modo de transporte:</strong> <br />
      <button
        className={`div-ruta-button ${modotransporte === "caminando" ? "div-ruta-button-active" : ""}`}
        onClick={() => setModoTransporte("caminando")}
      >
        Caminata 🚶‍♀️
      </button>
      <button
        className={`div-ruta-button ${modotransporte === "bicicleta" ? "div-ruta-button-active" : ""}`}
        onClick={() => setModoTransporte("bicicleta")}
        style={{ marginLeft: 8 }}
      >
        Bicicleta 🚴‍♂️
      </button>
      <button
        className={`div-ruta-button ${modotransporte === "publico" ? "div-ruta-button-active" : ""}`}
        onClick={() => setModoTransporte("publico")}
        style={{ marginLeft: 8 }}
      >
        Transporte público 🚌
      </button>
      <div>
        <strong>Transporte seleccionado:</strong> {modotransporte || "Ninguno"}
      </div>
      <button onClick={handleGuardarRecorrido} style={{ marginTop: 10 }}>
  Guardar recorrido
</button>

    </div>

    <div className="div-ruta-info" style={{ marginTop: 10 }}>
      <strong>Origen:</strong> {origin ? origin.join(", ") : "No seleccionado"} <br />
      <strong>Destino:</strong> {destination ? destination.join(", ") : "No seleccionado"} <br />
      {distanceKm && (
        <div>
          <strong>Distancia:</strong> {distanceKm} Km
        </div>
      )}
    </div>
  </div>
);
}