/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getAllEvents, getEventById } from "../data/events";
import { sortData } from "../utils/utils";
import { getAllShipmentPlanBySidomkeys, getShipmentPlanByEvent, removeShipmentPlan, updateShipmentPlan } from "../data/shipmentPlanner";

const ShipmentPlannerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useShipmentPlannerContext = () => {
  const ctx = useContext(ShipmentPlannerContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const ShipmentPlannerProvier = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessObjectives, setBusinessObjectives] = useState(null);
  const [timeFrame, setTimeFrame] = useState([null, null]);

  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [reloadData, setReloadData] = useState(null);
  const [data, setData] = useState(null);

  const [shipmentPlanBySidomkeys, setShipmentPlanBySidomkeys] = useState(null);
  const [shipmentPlanByYear, setShipmentPlanByYear] = useState(null);
  const [shipmentPlanYears, setShipmentPlanYears] = useState(null);
  const [yearSelected, setYearSelected] = useState(null);

  const { user } = useUserContext();

  const getData = async () => {
    setLoading(true);
    try {
      const params = { token: user.token };
      const events = await getAllEvents(params);
      sortData(events, "startDateTime", "asc");
      setBusinessObjectives(events);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  function getYearOfEvent(str) {
    // Expresión regular para buscar un año en formato yyyy
    const regex = /\b\d{4}\b/g;
    
    // Buscar coincidencias en el string
    const matches = str.match(regex);
    
    // Si se encontraron coincidencias, retornar el primer año encontrado
    // De lo contrario, retornar null
    return matches ? matches[0] : "SIN DEFINIR";
  }

  const getShipmentsPlanBySidomkeys = async () => {
    try {
      const planById = new Map();
      const shipmentPlanByYear = new Map();
      const params = { token: user.token, sidomkeys: user.sidomkeys };
      const ret = await getAllShipmentPlanBySidomkeys(params);

      const list = ret.map((o) => {
        planById.set(o.id, o);
        const ret = { ...o.shipment, hasPlan: o.shipmentPlan ? true : false };

        //const year = o.shipment.necesidadEnCd ? o.shipment.necesidadEnCd.substring(0, 4) : "SIN DEFINIR";
        const year = getYearOfEvent(o.shipment.evento);
        let arr = shipmentPlanByYear.get(year);
        if(!arr){
          arr = [];
          shipmentPlanByYear.set(year, arr);
        }
        arr.push(ret);

        return ret;
      });

      setData(ret);
      setShipmentPlanBySidomkeys(list);
      setShipmentPlanByYear(shipmentPlanByYear);
    } catch (error) {
      setError(error.message);
    }
  };


  function eventOrder(arr) {
    arr.sort((a, b) => {
      // Si uno de los elementos es "SIN DEFINIR", lo colocamos al final
      if (a === "SIN DEFINIR") return 1;
      if (b === "SIN DEFINIR") return -1;
      
      // Convertimos los elementos a números y los comparamos
      return parseInt(b) - parseInt(a);
    });

    return(arr);
  }

  useEffect(() => {
    if (shipmentPlanByYear) {
      const keys = [...shipmentPlanByYear.keys()];

      eventOrder(keys);
      setShipmentPlanYears(keys);
    }  
  }, [shipmentPlanByYear])
  
  async function initData() {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);

    const end = new Date();
    end.setFullYear(end.getFullYear() + 1);

    setTimeFrame([start, end]);
    await getData();
  }

  useEffect(() => {
    getShipmentsPlanBySidomkeys();
  }, [user, reloadData]);

  // useEffect(() => {
  //   getShipmentsPlanBySidomkeys();
  // }, [yearSelected]);
  
  function reload() {
    setReloadData(Date.now());
  }

  function getShipmentPlanById(id) {
    const ret = data?.find((s) => s.shipment.id === id);
    return ret;
  }

  // async function getBusinessObjectivesBySidomkeys(sidomkeys) {
  //   const params = { token: user.token, sidomkeys: sidomkeys };
  //   const ret = await getAllBusinessObjectivesBySidomkeys(params);

  //   //const ret = businessObjectives.find(bo => bo.sidomkeys.includes(name));
  //   return ret;
  // }

  async function getAssociatedEventById(id) {
    const params = { token: user.token, id: id };
    const ret = await getEventById(params);
    return ret;
  }

  function hasPlan() {
    let ret = false;
    const shipment = shipmentPlanBySidomkeys?.find((s) => s.id === selectedShipmentId);
    if (shipment) {
      ret = shipment.hasPlan;
    }
    return ret;
  }

  function getPlan() {
    let ret = false;
    const shipment = data?.find((s) => s.shipment.id === selectedShipmentId);
    if (shipment) {
      ret = shipment.shipmentPlan;
    }
    return ret;
  }

  async function update(plan) {
    const params = {
      token: user.token,
      body: plan,
    };

    const ret = await updateShipmentPlan(params);
    return ret;
  }

  async function removePlan() {
    const plan = getPlan();
    if (plan) {
      const params = {
        token: user.token,
        id: plan.id,
      };

      await removeShipmentPlan(params);
    }
  }

  const getShipmentsPlanByEvent = async (eventId) => {
    let ret = null;
    try {
      const params = { token: user.token, id: eventId };
      ret = await getShipmentPlanByEvent(params);

    } catch (error) {
      setError(error.message);
    }

    return(ret);
  };

  return (
    <ShipmentPlannerContext.Provider
      value={{
        initData,
        loading,
        user,
        error,
        businessObjectives,
        timeFrame,
        setTimeFrame,
        selectedShipmentId,
        setSelectedShipmentId,
        scrollYPos,
        setScrollYPos,
        selectedColumnId,
        setSelectedColumnId,
        sortOrder,
        setSortOrder,
        shipmentPlanBySidomkeys,
        reload,
        hasPlan,
        getShipmentPlanById,
        getAssociatedEventById,
        update,
        removePlan,
        getShipmentsPlanByEvent,
        shipmentPlanByYear,
        yearSelected, setYearSelected,
        shipmentPlanYears
      }}
    >
      {children}
    </ShipmentPlannerContext.Provider>
  );
};

export default ShipmentPlannerProvier;
