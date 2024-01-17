/* eslint-disable react/prop-types */
import { Button, Group, Select, Text } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";

const ShipmentPlannerEditorToolbar = ({ save, shipment, selectedEvent, setSelectedEvent }) => {
  const { t } = useTranslation();

  const { businessObjectives } = useShipmentPlannerContext();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    if (businessObjectives) {
      const events = businessObjectives.map((b) => {
        const ret = { label: b.name, value: b.id };
        return ret;
      });

      setEvents(events);
    }
  }, [businessObjectives]);


  useEffect(() => {
    if (shipment) {
      console.log("ShipmentPlannerEditorToolbar shipment ->", shipment);
    }
  }, [shipment]);

  const onSave = () => {
    save();
  };

  return (
    <Group justify="space-between">
      <Group>
        {/* <Text>{"ShipmentPlannerEditorToolbar"}</Text> */}

        <Select
          data={events}
          value={selectedEvent}
          onChange={setSelectedEvent}
          placeholder={t("crud.shipmentPlanner.placeholder.event")}
        />
      </Group>

      <Group>
        <Button
          leftSection={<IconDeviceFloppy size={20} />}
          onClick={onSave}
          disabled={save === null ? true : false}
          placeholder={t("general.button.save")}
          size="xs"
        >
          <Text size="xs">{t("general.button.save")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default ShipmentPlannerEditorToolbar;
