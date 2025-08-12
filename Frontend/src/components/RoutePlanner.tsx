//para este componente se uso leaflet una liberia de js que permite crear mapas iterativos para
//paginas web
import { useState, useMemo, useEffect } from "react";
// declarar ubicacion en tiempo real

// Importamos React y dos hooks importantes:
// useState para manejar estados internos del componente,
// useMemo para memorizar valores calculados y optimizar el rendimiento

//importar css para las rutas
import "./style/RoutePlanner.css";
//importamos api
import api from "../services/api";

import { useAuth } from "../contexts/AuthContext";
// Pon aquí la ruta real donde esté tu contexto de autenticación

import {
  MapContainer, // es el contenedor principal donde se renderiza el mapa
  TileLayer, //capa que carga los files o mosaicos
  Marker, // para mostrar marcadores o pines en el mapa con una posicion especifica
  useMapEvents, // hook para escuchar varios eventos que ocurren en el mapa , como clics,movimientos etc
  Polyline,
  useMap, //para dibujar lineas que unen varios puntos del mapa (rutas o caminos)
} from "react-leaflet";

import L /*{ latLng, LatLng }*/ from "leaflet"; // importamos la liberia baseleaflet en js puro, para poder
//hacer calculos que react-leaftlet no incluye directamente , como calcular distancias
// entre coordenadas

import "leaflet/dist/leaflet.css";
// Importamos los estilos CSS necesarios para que Leaflet se vea bien
//esto es los necesarios para que el mapa

// Importación de imágenes para los iconos de los marcadores
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"; // icono para las pantallas (alta resolucion)

import iconUrl from "leaflet/dist/images/marker-icon.png"; //icono estandar del marcador
import shadowUrl from "leaflet/dist/images/marker-shadow.png"; //sombra que aparece debajo del icono

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
  popupAnchor: [1, -34], //Posición donde se muestra el popup respecto al icono
  shadowSize: [41, 41], //tamaño de la sombra debajo del icono
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
  onClick: (pos: [number, number]) => void; //void signigica que la funcion no devuelve ningun valor ,
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

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng]);
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
  // ubiacion en tiempo real
  const [posicionActual, setPosicionActual] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [errorPosicion, setErrorPosicion] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosicionActual({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setErrorPosicion(null);
        },
        (err) => {
          setErrorPosicion(err.message);
        }
      );
    } else {
      setErrorPosicion("localizacion incorrecto");
    }
  }, []);

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
  const distanceKm = useMemo(() => {
    //use memo hace que esta funcion solo se ejecute cuando,//cambien a origin//
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



// Objeto que define la velocidad promedio en kilómetros por hora para cada modo de transporte.
// Las claves son los nombres de los modos de transporte, y los valores son las velocidades en km/h.
const velocidadesKm: { [key: string]: number } = {
  caminata: 5,      // Velocidad promedio caminando: 5 km/h
  bicicleta: 15,    // Velocidad promedio en bicicleta: 15 km/h
  publico: 25,      // Velocidad promedio en transporte público: 25 km/h
};

// useMemo es un hook de React que memoriza el resultado de una función para evitar recalcularlo innecesariamente.
// Este hook calcula el tiempo estimado del recorrido en formato hh:mm:ss, basado en la distancia y el modo de transporte.
const tiempo_ruta = useMemo(() => {
  // Si no existe distancia o no se ha seleccionado un modo de transporte, se retorna null (no se calcula tiempo).
  if (!distanceKm || !modotransporte) return null;

  // Se obtiene la velocidad correspondiente al modo de transporte seleccionado desde el objeto velocidadesKm.
  const velocidad = velocidadesKm[modotransporte];
  
  // Si por alguna razón no existe una velocidad para el modo de transporte (valor undefined), se retorna null.
  if (!velocidad) return null;

  // Cálculo del tiempo en horas dividiendo la distancia entre la velocidad.
  const tiempoHoras = distanceKm / velocidad;

  // Convertimos el tiempo de horas a segundos (1 hora = 3600 segundos) y redondeamos al entero más cercano.
  const tiempoSegundos = Math.round(tiempoHoras * 3600);

  // Se calculan las horas enteras dividiendo los segundos totales entre 3600 segundos (1 hora).
  const horas = Math.floor(tiempoSegundos / 3600);

  // Se calculan los minutos restantes, usando el resto de la división anterior y dividiéndolo entre 60.
  const minutos = Math.floor((tiempoSegundos % 3600) / 60);

  // Se calculan los segundos restantes después de extraer horas y minutos.
  const segundos = tiempoSegundos % 60;

  // Función auxiliar para formatear números con ceros a la izquierda cuando tengan un solo dígito.
  // Por ejemplo, 5 se convierte en "05".
  const pad = (n: number) => n.toString().padStart(2, "0");

  // Se devuelve una cadena con el tiempo formateado en formato "hh:mm:ss", usando la función pad para cada unidad.
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
  
  // Los valores de distanceKm y modotransporte son las dependencias: la función se recalcula solo si alguno cambia.
}, [distanceKm, modotransporte]);

const { usuario } = useAuth(); // user tendría info como id, nombre, etc.

  const factoresEmision: { [key: string]: number } = {
    caminata: 0,
    bicicleta: 0,
    "transporte publico": 0.05,
  };

  const id_usuario = usuario?.IdUsuario;
   function obtenerFechaActual() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
  const dia = hoy.getDate().toString().padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}


  const handleGuardarRecorrido = async () => {
    if (!origin || !destination || !modotransporte) {
      alert("Debes seleccionar origen, destino y modo de transporte");
      return;
    }

    // Mapeo correcto de los valores del frontend a la base de datos
    const mapeoTransporte = {
      caminando: "caminata", // Frontend -> Base de datos
      bicicleta: "bicicleta", // Se mantiene igual
      publico: "transporte publico", // Frontend -> Base de datos
    };
    const factor = factoresEmision[mapeoTransporte[modotransporte]] ?? 0;
    const emisionCo2Calculadas = distanceKm ? distanceKm * factor : 0;
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



const fecha = obtenerFechaActual();

    
    



      await api.post("/recorridos", {
        id_ruta: ruta.id_ruta,
        fecha_recorrido: fecha,
        tiempo_ruta: tiempo_ruta,
        id_usuario,

        medio_transporte: mapeoTransporte[modotransporte],
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
        center={
          posicionActual
            ? [posicionActual.lat, posicionActual.lng]
            : defaultPosition
        }
        zoom={13}
        className="div-ruta-map"
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onClick={handleMapClick} />

        {posicionActual && (
          <RecenterMap lat={posicionActual.lat} lng={posicionActual.lng} />
        )}

        {origin && <Marker position={origin} icon={customIcon} />}
        {destination && <Marker position={destination} icon={customIcon} />}

        {origin && destination && (
          <Polyline positions={[origin, destination]} color="blue" weight={5} />
        )}
      </MapContainer>

      {errorPosicion && (
        <p style={{ color: "blue" }}>Error en la posiciion :{errorPosicion} </p>
      )}
      <div
        className="div-ruta-modo-transporte"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <strong>Modo de transporte:</strong> <br />
        <button
          className={`div-ruta-button ${
            modotransporte === "caminando" ? "div-ruta-button-active" : ""
          }`}
          onClick={() => setModoTransporte("caminando")}
        >
          Caminata 🚶‍♀️
        </button>
        <button
          className={`div-ruta-button ${
            modotransporte === "bicicleta" ? "div-ruta-button-active" : ""
          }`}
          onClick={() => setModoTransporte("bicicleta")}
          style={{ marginLeft: 8 }}
        >
          Bicicleta 🚴‍♂️
        </button>
        <button
          className={`div-ruta-button ${
            modotransporte === "publico" ? "div-ruta-button-active" : ""
          }`}
          onClick={() => setModoTransporte("publico")}
          style={{ marginLeft: 8 }}
        >
          Transporte público 🚌
        </button>
        <div>
          {tiempo_ruta && (
            <div>
              <strong>Tiempo estimado:</strong> {tiempo_ruta}
            </div>
          )}
          <strong>Transporte seleccionado:</strong>{" "}
          {modotransporte || "Ninguno"}
        </div>
        <button onClick={handleGuardarRecorrido} style={{ marginTop: 10 }}>
          Guardar recorrido
        </button>
      </div>

      <div className="div-ruta-info" style={{ marginTop: 10 }}>
        <strong>Origen:</strong>{" "}
        {origin ? origin.join(", ") : "No seleccionado"} <br />
        <strong>Destino:</strong>{" "}
        {destination ? destination.join(", ") : "No seleccionado"} <br />
        {distanceKm && (
          <div>
            <strong>Distancia:</strong> {distanceKm} Km
          </div>
        )}
      </div>
    </div>
  );
}
