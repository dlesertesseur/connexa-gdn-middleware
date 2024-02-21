/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Loader, Stack } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import { getEventsByYear } from "../../data/events";
import { sortData } from "../../utils/utils";
import EventTimeline from "../ui/EventTimeline";
import Header from "./Header";
import Toolbar from "./Toolbar";
import InspectEventModal from "./InspectEventModal";

const MasterPlanPanel = () => {
  const { height } = useViewportSize();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [totalHeight, setTotalHeight] = useState(0);
  const [opened, { close, open }] = useDisclosure(false);
  const [layers, setLayers] = useState(null);
  const { user } = useUserContext();

  const totalH = height - 200;
  const rowHeight = 46;

  async function getData() {
    const params = { token: user.token, year: selectedYear?.getFullYear() };
    const events = await getEventsByYear(params);
    sortData(events, "startDateTime", "asc");
    setData(events);
  }

  useEffect(() => {
    getData();
  }, [selectedYear]);

  useEffect(() => {
    if(totalH > 0){
      createLayers();
    }
  }, [totalH]);

  const createLayers = () => {
    let layers = [];

    const date = new Date();
    const actualDate = {
      id: "actual-day",
      startDateTime: date,
      endDateTime: date,
      color: "rgba( 0, 0, 0, 0.2 )",
      name: "actualDay",
      h: totalH,
      border: true
    };
    layers.push(actualDate);
    setLayers(layers);
  };

  useEffect(() => {
    if (data && height) {
      const rows = data.length + 1;
      const hRows = rows * rowHeight;

      if (hRows > totalH) {
        setTotalHeight(totalH);
      } else {
        setTotalHeight(hRows);
      }
    }
  }, [height, data]);

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map((m) => m.name);

  const onInspect = (event) => {
    setSelectedEvent(event);
    open();
  };

  return (
    <Stack spacing={0} h={height - 80}>
      <Header title={t("crud.shipmentPlanner.title")} />
      <Toolbar setValue={setSelectedYear} value={selectedYear} />

      {opened ? (
        <InspectEventModal
          opened={opened}
          close={close}
          event={selectedEvent}
          startYear={selectedYear?.getFullYear() - 1}
          endYear={selectedYear?.getFullYear() + 1}
        />
      ) : null}

      {data ? (
        <EventTimeline
          startYear={selectedYear?.getFullYear() - 1}
          endYear={selectedYear?.getFullYear() + 1}
          data={data}
          h={totalHeight}
          monthLabels={monthLabels}
          rowHeight={rowHeight}
          onInspect={onInspect}
          layers={layers}
        />
      ) : (
        <Center h={totalH} w={"100%"}>
          <Loader />
        </Center>
      )}
    </Stack>
  );
};

export default MasterPlanPanel;
