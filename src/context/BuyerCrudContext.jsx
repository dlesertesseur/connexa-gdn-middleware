import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
import { sortData } from "../utils/utils";
import { createBuyer, getAllBuyers, getBuyerById, removeBuyer, updateBuyer } from "../data/buyers";

const BuyerCrudContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBuyerCrudContext = () => {
  const ctx = useContext(BuyerCrudContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const BuyerCrudProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [buyers, setBuyers] = useState(null);
  const [reload, setReload] = useState(Date.now());
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeComponent, setActiveComponent] = useState("list");
  const { user } = useUserContext();

  async function getAll() {
    const params = { token: user.token };
    const list = await getAllBuyers(params);

    if(sortOrder && selectedColumnId){
      sortData(list, selectedColumnId, sortOrder);
    }

    setBuyers(list);
  }

  async function getById(id) {
    let ret = null;
    try {
      const params = { token: user.token, id: id };
      ret = await getBuyerById(params);
    } catch (error) {
      console.log(error);
      setError(error);
    }

    return ret;
  }

  async function create(values) {
    let ret = null;
    const params = { token: user.token, values: values };
    try {
      ret = await createBuyer(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function update(id, values) {
    let ret = null;
    const params = { token: user.token, id: id, values: values };
    try {
      ret = await updateBuyer(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function remove(id) {
    const params = { token: user.token, id: id };
    try {
      await removeBuyer(params);
    } catch (error) {
      setError(error);
    }
  }

  function reloadData() {
    setReload(Date.now());
  }

  function clearError() {
    setError(null);
  }

  function clearSelection(){
    setSelectedRowId(null);
  }

  return (
    <BuyerCrudContext.Provider
      value={{
        create,
        update,
        remove,
        reload,
        error,
        selectedRowId,
        buyers,
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
        activeComponent, setActiveComponent
      }}
    >
      {children}
    </BuyerCrudContext.Provider>
  );
};

export default BuyerCrudProvider;
