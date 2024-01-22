/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
import { getShipmentPlanByEvent } from "../data/shipmentPlanner";
import { sortData } from "../utils/utils";

const MasterPlanContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMasterPlanContext = () => {
  const ctx = useContext(MasterPlanContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const MasterPlanProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plansByEvent, setPlansByEvent] = useState(null);

  const { user } = useUserContext();

  const getShipmentsPlanByEvent = async (eventId) => {
    let plans = null;

    setLoading(true);
    try {
      const params = { token: user.token, id: eventId };
      plans = await getShipmentPlanByEvent(params);
      sortData(plans, "startDateTime", "asc");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    setPlansByEvent(plans);
    return plans;
  };

  return (
    <MasterPlanContext.Provider
      value={{
        loading,
        error,
        plansByEvent,
        getShipmentsPlanByEvent,
      }}
    >
      {children}
    </MasterPlanContext.Provider>
  );
};

export default MasterPlanProvider;
