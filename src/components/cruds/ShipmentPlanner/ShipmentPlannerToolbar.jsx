import { Group, Text } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useTranslation } from "react-i18next";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";

const ShipmentPlannerToolbar = () => {
  const { t } = useTranslation();
  const { timeFrame, setTimeFrame } = useShipmentPlannerContext();
  return (
    <Group justify="flex-start">
      <Text>{t("crud.shipmentPlanner.label.yearRange")}</Text>
      <YearPickerInput type="range" value={timeFrame} onChange={setTimeFrame} />
    </Group>
  );
};

export default ShipmentPlannerToolbar;
