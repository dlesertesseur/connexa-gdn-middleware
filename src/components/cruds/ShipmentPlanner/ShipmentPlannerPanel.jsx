import { Center, Loader, Stack } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import EventTimeline from "../../ui/EventTimeline";
import ShipmentPlannerToolbar from "./ShipmentPlannerToolbar";
import Header from "./Header";
import InspectModal from "./InspectModal";
import { useState } from "react";

const ShipmentPlannerPanel = () => {
  const { height } = useViewportSize();
  const { t } = useTranslation();
  const { businessObjectives, timeFrame } = useShipmentPlannerContext();

  const [opened, { close, open }] = useDisclosure(false);
  const [selectedEvent, setSeletedEvent] = useState(null);

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map((m) => m.name);
  const totalH = height - 200;

  const onInspect = (event) => {
    setSeletedEvent(event)
    open();
  }

  return (
    <Stack spacing={0}>
      <Header title={t("crud.shipmentPlanner.title")} />
      <ShipmentPlannerToolbar />

      <InspectModal opened={opened} close={close} event={selectedEvent}/>
      
      {timeFrame[0] && timeFrame[1] ? (
        <EventTimeline
          startYear={timeFrame[0].getFullYear()}
          endYear={timeFrame[1].getFullYear()}
          data={businessObjectives}
          h={totalH}
          monthLabels={monthLabels}
          onInspect={onInspect}
        />
      ) : (
        <Center h={totalH}>
          <Loader />
        </Center>
      )}
    </Stack>
  );
};

export default ShipmentPlannerPanel;
