/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { config } from "../../data/config";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Componente funcional del mapa
const LocationMap = ({h = 600}) => {
  // Define la posición inicial del mapa
  const posicionInicial = [51.505, -0.09];

  const barcos = [
    { id: 1, nombre: "Barco 1", posicion: [51.505, -0.09] },
    { id: 2, nombre: "Barco 2", posicion: [51.51, -0.1] },
    // Agrega más barcos según sea necesario
  ];

  // Crea un objeto de icono personalizado
  const barcoIcon = new L.Icon({
    iconUrl: `${config.APP_PUBLIC_URL}/images/plane.png`,
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 16], // Punto de anclaje del icono
    popupAnchor: [0, -16], // Punto de anclaje del globo emergente
  });

  return (
    <MapContainer center={posicionInicial} zoom={5} style={{ height: `${h}px`, width: "100%" }} scrollWheelZoom={true}>
      {/* Agrega una capa de mosaicos (tiles) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {barcos.map((barco) => (
        <Marker key={barco.id} position={barco.posicion} icon={barcoIcon}>
          <Popup>{barco.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;
