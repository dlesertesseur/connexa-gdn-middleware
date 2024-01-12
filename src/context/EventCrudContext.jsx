import { createContext, useContext, useState } from "react";
import { createEvent, getAllEvents, getEventById, removeEvent, updateEvent } from "../data/events";
import { useUserContext } from "./UserContext";
import { sortData } from "../utils/utils";

const EventCrudContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEventCrudContext = () => {
  const ctx = useContext(EventCrudContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const EventCrudProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(null);
  const [reload, setReload] = useState(Date.now());
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = useUserContext();

  const getAll = async () => {
    const params = { token: user.token };
    const list = await getAllEvents(params);

    if(sortOrder && selectedColumnId){
      sortData(list, selectedColumnId, sortOrder);
    }

    setEvents(list);
  };

  const getById = async (id) => {
    let ret = null;
    try {
      const params = { token: user.token, id: id };
      ret = await getEventById(params);
    } catch (error) {
      console.log(error);
      setError(error);
    }

    return ret;
  };

  async function create(values) {
    let ret = null;
    const params = { token: user.token, values: values };
    try {
      ret = await createEvent(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function update(id, values) {
    let ret = null;
    const params = { token: user.token, id: id, values: values };
    try {
      ret = await updateEvent(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function remove(id) {
    const params = { token: user.token, id: id };
    try {
      await removeEvent(params);
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
    <EventCrudContext.Provider
      value={{
        create,
        update,
        remove,
        reload,
        error,
        selectedRowId,
        events,
        getAll,
        getById,
        setSelectedRowId,
        clearError,
        clearSelection,
        reloadData,
        selectedColumnId,
        sortOrder,
        setSelectedColumnId,
        setSortOrder
      }}
    >
      {children}
    </EventCrudContext.Provider>
  );
};

export default EventCrudProvider;
