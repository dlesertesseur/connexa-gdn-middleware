import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useTranslation } from "react-i18next";
import { useUserContext } from "./UserContext";
import {
  findAllAnalysts,
  findAllBusinessObjectives,
  findAllImportationStatuses,
  findImportationStatusCount,
  findImportationsByStatus,
  findImportationsIndicatorsByStatus,
  getProcessStatus,
} from "../data/Importations";

const ImportationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useImportationContext = () => {
  const ctx = useContext(ImportationContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const ImportationProvider = ({ children }) => {
  const { t } = useTranslation();
  const [statuses, setStatuses] = useState(null);
  const [businessObjectives, setBusinessObjectives] = useState(null);
  const [analysts, setAnalysts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processControl, setProcessControl] = useState(null);
  const [businessObjectiveSelected, setBusinessObjectiveSelected] = useState(t("importations.label.all"));
  const [analystSelected, setAnalystSelected] = useState(t("importations.label.all"));
  const [statusSelected, setStatusSelected] = useState(null);
  const [importationsByStatus, setImportationsByStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [totalsByStatus, setTotalsByStatus] = useState(null);
  const [loadingTotalsData, setLoadingTotalsData] = useState(false);
  const [selectedImportationId, setSelectedImportationId] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const { user } = useUserContext();

  const refreshData = () => {
    setLastUpdate(Date.now());
    setLoadingTotalsData(true);
  };

  const getData = async () => {
    setLoading(true);
    const params = {
      token: user.token,
    };

    try {
      const processControl = await getProcessStatus(params);
      if (processControl && processControl.length > 0) {
        setProcessControl(processControl[0]);
      }

      const list = await findAllImportationStatuses(params);
      if (list.message) {
        setError(list.message);
      } else {
        const ret = list.filter((i) => i !== "");
        setStatuses(ret);

        let events = await findAllBusinessObjectives(params);
        events = events.filter((e) => e !== "");
        events.unshift(t("importations.label.all"));
        events = events.filter((e) => e !== null);
        setBusinessObjectives(events);

        let analysts = await findAllAnalysts(params);
        analysts = analysts.filter((e) => e !== "");
        analysts.unshift(t("importations.label.all"));
        setAnalysts(analysts);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const selectStatus = (status) => {
    setStatusSelected(status);
  };

  const getImportatiosByStatus = async () => {
    console.log("ImportationContext getImportatiosByStatus() statusSelected -> ", statusSelected);
    const params = {
      token: user.token,
      status: statusSelected,
    };

    if (businessObjectiveSelected !== t("importations.label.all")) {
      params.event = businessObjectiveSelected;
    }

    if (analystSelected !== t("importations.label.all")) {
      params.analyst = analystSelected;
    }

    try {
      setLoading(true);
      const list = await findImportationsByStatus(params);
      setLoading(false);

      if (list.message) {
        setError(list.message);
      } else {
        setImportationsByStatus(list);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (statusSelected) {
      getImportatiosByStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusSelected]);

  const getInfoCards = async () => {
    if (statuses) {
      const totalsByStatus = new Map();

      for (let index = 0; index < statuses.length; index++) {
        const status = statuses[index];

        const params = {
          token: user.token,
          status: status,
        };

        if (businessObjectiveSelected !== t("importations.label.all")) {
          params.event = businessObjectiveSelected;
        }

        if (analystSelected !== t("importations.label.all")) {
          params.analyst = analystSelected;
        }

        try {
          const value = await findImportationStatusCount(params);
          if (!value.message) {
            const count = value;
            const partials = await findImportationsIndicatorsByStatus(params);

            const obj = {
              status: status,
              count: count,
              partials: partials,
            };
            totalsByStatus.set(status, obj);
          }
        } catch (error) {
          console.log(error);
        }
      }

      setTotalsByStatus(totalsByStatus);
      setLoadingTotalsData(false);
    }
  };

  useEffect(() => {
    getInfoCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuses, lastUpdate]);

  const setFilterData = (event, analyst) => {
    setBusinessObjectiveSelected(event);
    setAnalystSelected(analyst);
    setLoadingTotalsData(true);
  }

  return (
    <ImportationContext.Provider
      value={{
        businessObjectiveSelected,
        analystSelected,
        statuses,
        businessObjectives,
        analysts,
        loading,
        error,
        processControl,
        totalsByStatus,
        statusSelected,
        importationsByStatus,
        loadingTotalsData,
        getData,
        selectStatus,
        refreshData,
        setFilterData,
        selectedImportationId, setSelectedImportationId,
        scrollYPos, setScrollYPos,
      }}
    >
      {children}
    </ImportationContext.Provider>
  );
};

export default ImportationProvider;
