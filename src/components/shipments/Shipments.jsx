import { Outlet } from "react-router-dom";
import ShipmentProvider from "../../context/ShipmentContext";

const Importations = () => {
  return (
    <ShipmentProvider>
      <Outlet />
    </ShipmentProvider>
  );
};

export default Importations;
