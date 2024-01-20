/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getAllEvents, getEventById } from "../data/events";
import { sortData } from "../utils/utils";
import { getAllShipmentPlanBySidomkeys, removeShipmentPlan, updateShipmentPlan } from "../data/shipmentPlanner";

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

  const getShipmentsPlanBySidomkeys = async () => {
    try {
      const planById = new Map();
      const params = { token: user.token, sidomkeys: user.sidomkeys };
      const ret = await getAllShipmentPlanBySidomkeys(params);

      const list = ret.map((o) => {
        planById.set(o.id, o);
        const ret = { ...o.shipment, hasPlan: o.shipmentPlan ? true : false };
        return ret;
      });

      setData(ret);
      setShipmentPlanBySidomkeys(list);
    } catch (error) {
      setError(error.message);
    }
  };

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
      }}
    >
      {children}
    </ShipmentPlannerContext.Provider>
  );
};

export default ShipmentPlannerProvier;
