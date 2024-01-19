import DocumentsCrudProvider from "../../../context/DocumentsCrudContext";
import DocumentsList from "./DocumentsList";

const DocumentsCrud = () => {
  return (
    <DocumentsCrudProvider>
      <DocumentsList />
    </DocumentsCrudProvider>
  );
};

export default DocumentsCrud;
