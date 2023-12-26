import { Outlet } from "react-router-dom";
import ImportationProvider from "../../context/ImportationContext";

const Importations = () => {
  return (
    <ImportationProvider>
      <Outlet/>
    </ImportationProvider>
  );
};

export default Importations;
