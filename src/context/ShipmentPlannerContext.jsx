/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
import { getAllEvents } from "../data/events";
import { sortData } from "../utils/utils";

const ShipmentPlannerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useShipmentPlannerContext = () => {
  const ctx = useContext(ShipmentPlannerContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const ShipmentPlannerProvier = ({ children }) => {
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [businessObjectives, setBusinessObjectives] = useState(null);
  const [timeFrame, setTimeFrame] = useState([null, null]);

  const { user } = useUserContext();

  const getData = async () => {
    setLoadingData(true);
    try {
      const params = { token: user.token };
      const events = await getAllEvents(params);
      sortData(events, "startDateTime", "asc");
      setBusinessObjectives(events);
    } catch (error) {
      setError(error.message);
    }
    setLoadingData(false);
  };

  async function initData() {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);

    const end = new Date();
    end.setFullYear(end.getFullYear() + 1);

    setTimeFrame([start, end]);
    await getData();
  }

  return (
    <ShipmentPlannerContext.Provider
      value={{
        initData,
        loadingData,
        user,
        error,
        businessObjectives,
        timeFrame,
        setTimeFrame,
      }}
    >
      {children}
    </ShipmentPlannerContext.Provider>
  );
};

export default ShipmentPlannerProvier;
