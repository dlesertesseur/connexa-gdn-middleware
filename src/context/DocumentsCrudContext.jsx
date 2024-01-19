import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
import { sortData } from "../utils/utils";
import { assignBuyer, getAllDocuments, getDocumentById, unassignBuyer } from "../data/documents";

const DocumentsCrudContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDocumentsCrudContext = () => {
  const ctx = useContext(DocumentsCrudContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const DocumentsCrudProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [reload, setReload] = useState(Date.now());
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeComponent, setActiveComponent] = useState("list");
  const { user } = useUserContext();

  async function getAll() {
    const params = { token: user.token, sidomkeys: user.sidomkeys};
    const list = await getAllDocuments(params);

    const ret = list.map((d) => {
      const doc = { ...d.document, documentBuyer: d.documentBuyer?.buyerName, documentBuyerRelationId: d.documentBuyer?.id };
      return doc;
    });

    if (sortOrder && selectedColumnId) {
      sortData(ret, selectedColumnId, sortOrder);
    }

    setDocuments(ret);
  }

  async function assignBuyerToDocument(buyerName) {

    const doc = getDocument(selectedRowId);
    
    const params = { token: user.token, buyerName: buyerName, documentReference: doc.referencia };
    const res = await assignBuyer(params);

    if (!res.id) {
      throw new Error(`${res.status}`);
    }
  }

  async function unassignBuyerToDocument(documentBuyerRelationId) {
    const params = { token: user.token, id: documentBuyerRelationId };
    const res = await unassignBuyer(params);

    if (!res.id) {
      throw new Error(`${res.status}`);
    }
  }

  async function getById(id) {
    let ret = null;
    try {
      const params = { token: user.token, id: id };
      ret = await getDocumentById(params);
    } catch (error) {
      console.log(error);
      setError(error);
    }

    return ret;
  }

  function hasBuyer(id) {
    let ret = false;
    if (documents) {
      const reg = documents.find((d) => d.id === id);
      if (reg) {
        ret = reg.documentBuyer ? true : false;
      }
    }

    return ret;
  }


  function getDocument(id) {
    let ret = null;
    if (documents) {
      ret = documents.find((d) => d.id === id);
    }

    return ret;
  }

  function reloadData() {
    setReload(Date.now());
  }

  function clearError() {
    setError(null);
  }

  function clearSelection() {
    setSelectedRowId(null);
  }

  return (
    <DocumentsCrudContext.Provider
      value={{
        reload,
        error,
        selectedRowId,
        documents,
        getAll,
        getById,
        setSelectedRowId,
        clearError,
        clearSelection,
        reloadData,
        selectedColumnId,
        sortOrder,
        setSelectedColumnId,
        setSortOrder,
        activeComponent,
        setActiveComponent,
        hasBuyer,
        assignBuyerToDocument,
        unassignBuyerToDocument
      }}
    >
      {children}
    </DocumentsCrudContext.Provider>
  );
};

export default DocumentsCrudProvider;
