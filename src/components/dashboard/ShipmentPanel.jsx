/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Badge, Stack, Tabs, Text } from "@mantine/core";
import { IconMoodAngry, IconMoodSmile } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ShipmentStatusDetail from "./ShipmentStatusDetail";

const headerHeight = 216;

const ShipmentPanel = ({ panel, height }) => {
  const { t } = useTranslation();
  const [shipmentGoodList, setShipmentGoodList] = useState(null);
  const [shipmentBadList, setShipmentBadList] = useState(null);
  const [shipmentGoodMap, setShipmentGoodMap] = useState(null);
  const [shipmentBadMap, setShipmentBadMap] = useState(null);

  useEffect(() => {
    const shipmentGoodMap = new Map();
    const shipmentBadMap = new Map();

    const shipmentGoodList = panel.data[1].data.map((s) => {
      shipmentGoodMap.set(s.shipment.id, s);
      return s.shipment;
    });

    const shipmentBadList = panel.data[0].data.map((s) => {
      shipmentBadMap.set(s.shipment.id, s);
      return s.shipment;
    });

    setShipmentGoodList(shipmentGoodList);
    setShipmentBadList(shipmentBadList);
    setShipmentGoodMap(shipmentGoodMap);
    setShipmentBadMap(shipmentBadMap);
  }, [panel]);

  return (
    <Stack gap={0}>
      <Tabs defaultValue="bad" variant="default">
        <Tabs.List>
          <Tabs.Tab
            value="bad"
            leftSection={<IconMoodAngry color="red" />}
            rightSection={
              <Badge color="red" size="xs">
                {shipmentBadList?.length}
              </Badge>
            }
          >
            <Text c={"red"} fw={600}>{t("label.bad")}</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="good"
            leftSection={<IconMoodSmile color="green" />}
            rightSection={
              <Badge color="green" size="xs">
                {shipmentGoodList?.length}
              </Badge>
            }
          >
            <Text c={"green"} fw={600}>{t("label.good")}</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="good" py={"xs"}>
          <ShipmentStatusDetail data={shipmentGoodList} shipmentMap={shipmentGoodMap} height={height - headerHeight} advantageColor={"green"}/>
        </Tabs.Panel>
        <Tabs.Panel value="bad" py={"xs"}>
          <ShipmentStatusDetail data={shipmentBadList} shipmentMap={shipmentBadMap} height={height - headerHeight} advantageColor={"red"}/>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default ShipmentPanel;
