/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { findAllChartData } from "../data/Dashboard";

const DashboardContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const DashboardProvier = ({ children }) => {
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [businessObjectives, setBusinessObjectives] = useState(null);
  const [businessObjectiveSelected, setBusinessObjectiveSelected] = useState(null);
  const [chartsData, setChartsData] = useState(null);
  const { user } = useUserContext();

  // eslint-disable-next-line no-unused-vars
  const getData = async () => {
    setLoadingData(true);
    try {
      let chartsData = await findAllChartData();
      setChartsData(chartsData);
      
      let events = chartsData.map( c => c.Name);
      events.sort();
      setBusinessObjectives(events);

    } catch (error) {
      setError(error.message);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    //getData();
  }, []);

  const getChartByBusinessObjective = (businessObjective) => {
    const found = chartsData.find((c) => c.Name === businessObjective);
    // console.log("getChartByBusinessObjective found -> ", found);
    return found;
  };

  return (
    <DashboardContext.Provider
      value={{
        loadingData,
        user,
        error,
        businessObjectives,
        businessObjectiveSelected,
        setBusinessObjectiveSelected,
        getChartByBusinessObjective,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvier;
