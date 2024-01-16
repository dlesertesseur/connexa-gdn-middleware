/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Loader, Stack } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import EventTimeline from "../../ui/EventTimeline";
import Header from "./Header";
import InspectModal from "./InspectModal";

const ShipmentPlannerEditor = () => {
  const { height } = useViewportSize();
  const { t } = useTranslation();

  const [opened, { close, open }] = useDisclosure(false);
  const [selectedSprint, setSeletedSprint] = useState(null);

  const [shipmentData, setShipmentData] = useState(null);
  const [sprints, setSprints] = useState(null);

  const { getShipmentPlanById, selectedShipmentId, getBusinessObjectivesBySidomkeys } = useShipmentPlannerContext();

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map((m) => m.name);
  const totalH = height - 200;

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

  useEffect(() => {
    if (shipmentData?.shipmentPlan) {
      setSprints(createSprints());
    }
  }, [shipmentData]);

  // const toolbar = (
  //   <Group justify="flex-start">
  //     <Text>{t("crud.shipmentPlanner.label.yearRange")}</Text>
  //   </Group>
  // );

  function getStartYear() {
    const date = new Date(shipmentData.shipmentPlan.preparationStart);
    return date.getFullYear();
  }

  function getEndYear() {
    const date = new Date(shipmentData.shipmentPlan.salesEnd);
    return date.getFullYear();
  }

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

  const getLayers = () => {
    let ret = null;
    const obj = shipmentData.shipment;
    const businessObjective = getBusinessObjectivesBySidomkeys(obj.evento);

    if (businessObjective) {
      ret = [
        {
          id: businessObjective.id,
          startDateTime: new Date(businessObjective.startDateTime),
          endDateTime: new Date(businessObjective.endDateTime),
          color: "rgba( 255, 0, 0, 0.2 )",
          name: businessObjective.name,
          h: totalH - 50,
        },
      ];
    }
    return ret;
  };

  const updateSprint = (sprint) => {
    console.log("updateSprint sptint -> ", sprint.index);
  };

  return (
    <Stack spacing={0}>
      <Header title={t("crud.shipmentPlanner.title")} />
      <InspectModal opened={opened} close={close} sprint={selectedSprint} onUpdate={updateSprint}/>

      {shipmentData ? (
        <EventTimeline
          startYear={getStartYear()}
          endYear={getEndYear()}
          data={sprints}
          h={totalH}
          monthLabels={monthLabels}
          onInspect={onInspect}
          layers={getLayers()}
        />
      ) : (
        <Center h={totalH}>
          <Loader />
        </Center>
      )}
    </Stack>
  );
};

export default ShipmentPlannerEditor;
