/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Select, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconCalendar, IconCalendarCheck, IconCalendarMinus, IconCalendarPlus, IconReload } from "@tabler/icons-react";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import { useAppContext } from "../../../context/AppContext";
import { useEffect, useState } from "react";

const Toolbar = ({ rowSelected, hasPlan, onDelete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { activeApp } = useAppContext();
  const [app, setApp] = useState(null);
  const { reload, shipmentPlanYears, yearSelected, setYearSelected } = useShipmentPlannerContext();

  useEffect(() => {
    const app = activeApp();
    setApp(app);
  }, []);

  const onUpdate = () => {
    navigate("editPlan");
  };

  const onCreate = () => {
    navigate("createPlan");
  };

  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{app?.name}</Title>
      </Group>

      <Group gap={"xs"} wrap="nowrap">
        <Select leftSection={<IconCalendar size={20} color="#1c7ed6"/>} w={140} size="xs" data={shipmentPlanYears} value={yearSelected} onChange={setYearSelected} />
        <Button
          size="xs"
          onClick={onCreate}
          disabled={rowSelected && !hasPlan ? false : true}
          leftSection={<IconCalendarPlus size={20} />}
        >
          <Text size="xs">{t("crud.shipmentPlanner.button.createPlan")}</Text>
        </Button>
        <Button
          size="xs"
          onClick={onUpdate}
          disabled={rowSelected && hasPlan ? false : true}
          leftSection={<IconCalendarCheck size={20} />}
        >
          <Text size="xs">{t("crud.shipmentPlanner.button.editPlan")}</Text>
        </Button>
        <Button
          size="xs"
          onClick={() => {
            onDelete();
          }}
          disabled={rowSelected && hasPlan ? false : true}
          leftSection={<IconCalendarMinus size={20} />}
        >
          <Text size="xs">{t("crud.shipmentPlanner.button.deletePlan")}</Text>
        </Button>

        <Button onClick={reload} size="xs" leftSection={<IconReload size={20} />}>
          <Text size="xs">{t("general.button.refresh")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default Toolbar;
