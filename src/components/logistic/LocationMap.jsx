/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { config } from "../../data/config";
import { Stack } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { findVesselByCode } from "../../data/vessels";
import { useUserContext } from "../../context/UserContext";
import { VesselCard } from "./VesselCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationMapToolbar from "./LocationMapToolbar";
import { useShipmentContext } from "../../context/ShipmentContext";

const LocationMap = ({ h = 600 }) => {
  //const posicionInicial = [51.505, -0.09];
  const [posicionInicial, setPosicionInicial] = useState([51.505, -0.09]);
  const location = useLocation();

  const { title } = location.state;
  const [vessels, setVessels] = useState(null);

  const { shipmentsByStatus } = useShipmentContext();
  const { user } = useUserContext();

  const getData = async () => {
    const ret = [];
    for (let index = 0; index < shipmentsByStatus.length; index++) {
      const i = shipmentsByStatus[index];
      const params = {
        token: user.token,
        name: i.medioDeTransporte,
      };

      try {
        const data = await findVesselByCode(params);
        ret.push(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (ret && ret.length > 0) {
      setPosicionInicial([ret[0].latitude, ret[0].longitude]);
    }

    setVessels(ret);
  };

  useEffect(() => {
    if (shipmentsByStatus) {
      getData();
    }
  }, [shipmentsByStatus]);

  // Crea un objeto de icono personalizado
  const barcoIcon = new L.Icon({
    // iconUrl: `${config.APP_PUBLIC_URL}/images/vessel.png`,
    // iconSize: [40, 10], // Tamaño del icono
    // iconAnchor: [20, 5], // Punto de anclaje del icono
    // popupAnchor: [0, -5], // Punto de anclaje del globo emergente

    iconUrl: `${config.APP_PUBLIC_URL}/images/pin.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32], // Punto de anclaje del icono
    popupAnchor: [0, -36], // Punto de anclaje del globo emergente
  });

  return (
    <Stack spacing={"xs"}>
      <LocationMapToolbar title={title} />
      <MapContainer
        center={posicionInicial}
        zoom={4}
        minZoom={3}
        style={{ height: `${h}px`, width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {/* <TileLayer url="https://www.openstreetmap.in/indic-map/#{z}/{x}/{y}"/> */}
        
        {vessels?.map((v) => {
          const ret = <Marker key={v.id} position={[v.latitude, v.longitude]} icon={barcoIcon}>
            <Popup closeButton={false}>
              <VesselCard data={v} />
            </Popup>
          </Marker>;
          return(ret);
        }
        )}
      </MapContainer>
    </Stack>
  );
};

export default LocationMap;
