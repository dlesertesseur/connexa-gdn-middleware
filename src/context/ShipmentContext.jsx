import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useTranslation } from "react-i18next";
import { useUserContext } from "./UserContext";
import {
  findAllAnalysts,
  findAllBusinessObjectives,
  findAllBuyers,
  findAllShipmentStatuses,
  findAllYears,
  findShipmentStatusCount,
  findShipmentsByStatus,
  findShipmentsIndicatorsByStatus,
  getProcessStatus,
  markShipmentAsModied,
} from "../data/shipments";

const ShipmentContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useShipmentContext = () => {
  const ctx = useContext(ShipmentContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const ShipmentProvider = ({ children }) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [statuses, setStatuses] = useState(null);
  const [businessObjectives, setBusinessObjectives] = useState(null);
  const [analysts, setAnalysts] = useState(null);
  const [buyers, setBuyers] = useState(null);
  const [years, setYears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processControl, setProcessControl] = useState(null);
  const [businessObjectiveSelected, setBusinessObjectiveSelected] = useState(t("importations.label.all"));
  const [analystSelected, setAnalystSelected] = useState(
    user?.sidomkeys !== "*" ? user.sidomkeys : t("importations.label.all")
  );
  const [buyerSelected, setBuyerSelected] = useState(t("importations.label.all"));
  const [yearSelected, setYearSelected] = useState(t("importations.label.all"));
  const [statusSelected, setStatusSelected] = useState(null);
  const [shipmentsByStatus, setShipmentsByStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [totalsByStatus, setTotalsByStatus] = useState(null);
  const [loadingTotalsData, setLoadingTotalsData] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

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

      const list = await findAllShipmentStatuses(params);
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

        let buyers = await findAllBuyers(params);
        buyers = buyers.filter((e) => e !== "");
        buyers.unshift(t("importations.label.all"));
        setBuyers(buyers);

        let years = await findAllYears(params);
        years = years.filter((e) => e !== "");
        years.unshift(t("importations.label.all"));
        setYears(years);
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

    if (buyerSelected !== t("importations.label.all")) {
      params.buyer = buyerSelected;
    }

    if (yearSelected !== t("importations.label.all")) {
      params.year = yearSelected;
    }

    try {
      setLoading(true);
      const list = await findShipmentsByStatus(params);
      setLoading(false);

      if (list.message) {
        setError(list.message);
      } else {
        setShipmentsByStatus(list);
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
  }, [statusSelected, analystSelected, analystSelected, buyerSelected, yearSelected]);

  const getInfoCards = async () => {
    const params = {
      token: user.token,
    };

    const processControl = await getProcessStatus(params);
    if (processControl && processControl.length > 0) {
      setProcessControl(processControl[0]);
    }

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

        if (buyerSelected !== t("importations.label.all")) {
          params.buyer = buyerSelected;
        }

        if (yearSelected !== t("importations.label.all")) {
          params.year = yearSelected;
        }

        try {
          const value = await findShipmentStatusCount(params);
          if (!value.message) {
            const count = value;
            const partials = await findShipmentsIndicatorsByStatus(params);

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

  const setFilterData = (event, analyst, buyer, year) => {
    setBusinessObjectiveSelected(event);
    setAnalystSelected(analyst);
    setBuyerSelected(buyer);
    setYearSelected(year);
    setLoadingTotalsData(true);
  };

  const markAsModified = (id) => {
    const shipment = shipmentsByStatus.find((s) => s.id === id);
    shipment.led = "RED";
    setShipmentsByStatus([...shipmentsByStatus]);

    const params = {
      token: user.token,
      reference: shipment.referencia,
    };

    markShipmentAsModied(params);
  };

  return (
    <ShipmentContext.Provider
      value={{
        businessObjectiveSelected,
        analystSelected,
        statuses,
        businessObjectives,
        analysts,
        years,
        loading,
        error,
        processControl,
        totalsByStatus,
        statusSelected,
        shipmentsByStatus,
        loadingTotalsData,
        getData,
        selectStatus,
        refreshData,
        setFilterData,
        selectedShipmentId,
        setSelectedShipmentId,
        scrollYPos,
        setScrollYPos,
        markAsModified,
        selectedColumnId,
        setSelectedColumnId,
        sortOrder,
        setSortOrder,
        buyers,
        setBuyers,
        buyerSelected,
        setBuyerSelected,
        yearSelected,
        setYearSelected,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export default ShipmentProvider;
