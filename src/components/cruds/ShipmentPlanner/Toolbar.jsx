/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconCalendarCheck, IconCalendarMinus, IconCalendarPlus, IconReload } from "@tabler/icons-react";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";

const Toolbar = ({ title, rowSelected, hasPlan, onDelete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const onBack = () => {
  //   setSelectedMenu(null);
  //   navigate(`${MODULE_APPS_ROOT}`);
  // };

  const onUpdate = () => {
    navigate("editPlan");
  };

  const onCreate = () => {
    navigate("createPlan");
  };

  const { reload } = useShipmentPlannerContext();

  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{title}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
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
        {/* <Button onClick={onBack} disabled={onBack === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button> */}

        <Button onClick={reload} size="xs" leftSection={<IconReload size={20} />}>
          <Text size="xs">{t("general.button.refresh")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default Toolbar;
