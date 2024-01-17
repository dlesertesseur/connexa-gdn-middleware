/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import { addDays, subtractDays } from "../../../utils/utils";
import EventTimeline from "../../ui/EventTimeline";
import Header from "./Header";
import InspectModal from "./InspectModal";
import ModalNotification from "../../ui/ModalNotification";
import ShipmentPlannerEditorToolbar from "./ShipmentPlannerEditorToolbar";

const currentYear = new Date().getFullYear();

const ShipmentPlannerEditor = () => {
  //const { height } = useViewportSize();
  const { t } = useTranslation();

  const rowHeight = 46;
  const [opened, { close, open }] = useDisclosure(false);
  const [selectedSprint, setSeletedSprint] = useState(null);

  const [shipmentData, setShipmentData] = useState(null);
  const [sprints, setSprints] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [layers, setLayers] = useState(null);
  const [error, setError] = useState(null);

  const [startYearGantt, setStartYearGantt] = useState(currentYear);
  const [endYearGantt, setEndYearGantt] = useState(currentYear+1);

  const { getShipmentPlanById, selectedShipmentId, getBusinessObjectivesBySidomkeys, update } =
    useShipmentPlannerContext();

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map((m) => m.name);

  const onInspect = (event) => {
    setSeletedSprint(event);
    open();
  };

  async function getData() {
    const ret = await getShipmentPlanById(selectedShipmentId);
    setShipmentData(ret);
  }

  useEffect(() => {
    getData();
  }, [selectedShipmentId]);

  // useEffect(() => {
  //   if (shipmentData) {
  //     getLayers();
  //   }
  // }, [shipmentData, sprints]);

  useEffect(() => {
    if (shipmentData?.shipmentPlan) {
      setSprints(createSprints());

      let date = null;
      date = new Date(shipmentData?.shipmentPlan.preparationStart);
      setStartYearGantt(date.getFullYear());

      date = new Date(shipmentData?.shipmentPlan.salesEnd);
      setEndYearGantt(date.getFullYear());
    }
  }, [shipmentData]);

  function createTimelineReg(id, name, description, color, duration) {
    const ret = {
      id: id,
      name: name,
      description: description,
      duration: duration,
      color: color,
    };

    return ret;
  }

  function createSprints() {
    const ret = [];
    const obj = shipmentData.shipmentPlan;
    ret.push(
      createTimelineReg(
        "preparation",
        t("sprints.preparation.label"),
        t("sprints.preparation.description"),
        t("sprints.preparation.color"),
        obj.preparationDurationInDays
      )
    );
    ret.push(
      createTimelineReg(
        "shipping",
        t("sprints.shipping.label"),
        t("sprints.shipping.description"),
        t("sprints.shipping.color"),
        obj.shippingDurationInDays
      )
    );
    ret.push(
      createTimelineReg(
        "reception",
        t("sprints.reception.label"),
        t("sprints.reception.description"),
        t("sprints.reception.color"),
        obj.receptionDurationInDays
      )
    );
    ret.push(
      createTimelineReg(
        "distribution",
        t("sprints.distribution.label"),
        t("sprints.distribution.description"),
        t("sprints.distribution.color"),
        obj.distributionDurationInDays
      )
    );
    ret.push(
      createTimelineReg(
        "sales",
        t("sprints.sales.label"),
        t("sprints.sales.description"),
        t("sprints.sales.color"),
        obj.salesDurationInDays
      )
    );

    let baseDay = new Date(obj.preparationStart);
    ret.forEach((r, index) => {
      r.startDateTime = new Date(baseDay.getTime());
      baseDay.setDate(baseDay.getDate() + r.duration);
      r.endDateTime = new Date(baseDay.getTime());
      r.index = index;
    });

    return ret;
  }

  const getLayers = async () => {
    let layers = null;
    const obj = shipmentData.shipment;
    const businessObjective = await getBusinessObjectivesBySidomkeys(obj.evento);

    if (businessObjective) {
      layers = businessObjective.map((bo) => {
        const ret = {
          id: bo.id,
          startDateTime: new Date(bo.startDateTime),
          endDateTime: new Date(bo.endDateTime),
          color: "rgba( 255, 0, 0, 0.2 )",
          name: bo.name,
          h: rowHeight * (sprints?.length + 1),
        };
        return ret;
      });

      // if (shipmentData && !shipmentData.shipmentPlan === null) {
      //   if (shipmentData && layers && layers.length > 0) {
      //     const layer = layers[0];
      //     setStartYearGantt(layer.startDateTime.getFullYear());
      //     setEndYearGantt(layer.endDateTime.getFullYear());
      //   } else {
      //     const startDate = Date.now();
      //     setStartYearGantt(startDate.getFullYear());

      //     const endDate = new Date(startDate);
      //     endDate.setFullYear(endDate.getFullYear() + 1);
      //     setEndYearGantt(endDate.getFullYear());
      //   }
      // }
    }
    setLayers(layers);
  };

  const updateSprint = (sprint) => {
    let baseDate = sprint.startDateTime;
    for (let index = sprint.index - 1; index >= 0; index--) {
      const s = sprints[index];
      s.endDateTime = new Date(baseDate);
      s.startDateTime = subtractDays(baseDate, s.duration);
      baseDate = new Date(s.startDateTime);
    }

    baseDate = sprint.endDateTime;
    for (let index = sprint.index + 1; index < sprints.length; index++) {
      const s = sprints[index];
      s.startDateTime = new Date(baseDate);
      s.endDateTime = addDays(baseDate, s.duration);
      baseDate = new Date(s.endDateTime);
    }

    setSprints([...sprints]);
  };

  const save = async () => {
    const plan = shipmentData.shipmentPlan;

    for (let index = 0; index < sprints.length; index++) {
      const sprint = sprints[index];

      switch (sprint.id) {
        case "preparation":
          plan.preparationStart = sprint.startDateTime;
          plan.preparationEnd = sprint.endDateTime;
          plan.preparationDurationInDays = sprint.duration;
          break;
        case "shipping":
          plan.shippingStart = sprint.startDateTime;
          plan.shippingEnd = sprint.endDateTime;
          plan.shippingDurationInDays = sprint.duration;
          break;
        case "reception":
          plan.receptionStart = sprint.startDateTime;
          plan.receptionEnd = sprint.endDateTime;
          plan.receptionDurationInDays = sprint.duration;
          break;
        case "distribution":
          plan.distributionStart = sprint.startDateTime;
          plan.distributionEnd = sprint.endDateTime;
          plan.distributionDurationInDays = sprint.duration;
          break;
        case "sales":
          plan.salesStart = sprint.startDateTime;
          plan.salesEnd = sprint.endDateTime;
          plan.salesDurationInDays = sprint.duration;
          break;

        default:
          break;
      }
    }

    try {
      const ret = await update(plan);
      console.log("ret -> ", ret);
    } catch (error) {
      console.log("error -> ", error);
      setError(error);
    }
  };

  return (
    <Stack gap={"xs"}>
      <ModalNotification
        opened={error}
        text={error?.message}
        state={"error"}
        onClick={() => {
          setError(null);
        }}
      />

      <Header title={t("crud.shipmentPlanner.title")} />
      <ShipmentPlannerEditorToolbar
        save={save}
        shipment={shipmentData}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <InspectModal opened={opened} close={close} sprint={selectedSprint} onUpdate={updateSprint} />

      <EventTimeline
        startYear={startYearGantt}
        endYear={endYearGantt}
        data={sprints}
        //h={rowHeight * (sprints?.length + 1)}
        h={300}
        rowHeight={rowHeight}
        monthLabels={monthLabels}
        onInspect={onInspect}
        layers={layers}
      />
    </Stack>
  );
};

export default ShipmentPlannerEditor;
