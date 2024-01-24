import { Outlet } from "react-router-dom";
import DocumentsCrudProvider from "../../../context/DocumentsCrudContext";

const DocumentsCrud = () => {
  return (
    <DocumentsCrudProvider>
      <Outlet/>
    </DocumentsCrudProvider>
  );
};

export default DocumentsCrud;
