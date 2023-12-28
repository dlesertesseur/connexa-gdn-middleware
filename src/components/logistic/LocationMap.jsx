/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { config } from "../../data/config";
import { Image, Stack, Text } from "@mantine/core";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationMapToolbar from "./LocationMapToolbar";
import { useEffect, useState } from "react";
import { useImportationContext } from "../../context/ImportationContext";
import { findVesselByCode } from "../../data/vessels";
import { useUserContext } from "../../context/UserContext";

const LocationMap = ({ h = 600 }) => {
  const posicionInicial = [51.505, -0.09];
  const location = useLocation();

  const { title } = location.state;
  const [vessels, setVessels] = useState(null);

  const { importationsByStatus } = useImportationContext();
  const { user } = useUserContext();

  const getData = async () => {
    const ret = [];
    for (let index = 0; index < importationsByStatus.length; index++) {
      const i = importationsByStatus[index];
      const params = {
        token: user.token,
        code: i.docReferencia,
      };

      try {
        const data = await findVesselByCode(params);
        ret.push(data);
      } catch (error) {
        console.log(error);
      }
    }

    setVessels(ret);
  };

  useEffect(() => {
    if (importationsByStatus) {
      getData();
    }
  }, [importationsByStatus]);

  // Crea un objeto de icono personalizado
  const barcoIcon = new L.Icon({
    iconUrl: `${config.APP_PUBLIC_URL}/images/vessel.png`,
    iconSize: [40, 10], // Tamaño del icono
    iconAnchor: [20, 5], // Punto de anclaje del icono
    popupAnchor: [0, -5], // Punto de anclaje del globo emergente
  });

  return (
    <Stack spacing={"xs"}>
      <LocationMapToolbar title={title} />
      <MapContainer
        center={posicionInicial}
        zoom={5}
        style={{ height: `${h}px`, width: "100%" }}
        scrollWheelZoom={true}
      >
        {/* Agrega una capa de mosaicos (tiles) */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {vessels?.map((v) => (
          <Marker key={v.id} position={[v.latitude, v.longitude]} icon={barcoIcon}>
            <Popup>
              <Stack gap={0} bg={"blue"}>
                <Text size="sm" fw={500}>{v.name}</Text>
                <Image src={"https://picsum.photos/300/300"} alt={v.name}></Image>
              </Stack>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Stack>
  );
};

export default LocationMap;
