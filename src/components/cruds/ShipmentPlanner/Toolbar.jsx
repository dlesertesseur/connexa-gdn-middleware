/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MODULE_APPS_ROOT } from "../../../data/config";
import { useAppContext } from "../../../context/AppContext";

const Toolbar = ({ title, rowSelected, hasPlan }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setSelectedMenu } = useAppContext();
  
  const onBack = () => {
    setSelectedMenu(null);
    navigate(`${MODULE_APPS_ROOT}`);
  };
  const onCreate = () => {
    navigate("createPlan");
  };
  const onUpdate = () => {
    navigate("editPlan");
  };

  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{title}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
        <Button size="xs" onClick={onCreate} disabled={onCreate && rowSelected && !hasPlan ? false : true}>
          <Text size="xs">{t("crud.shipmentPlanner.button.createPlan")}</Text>
        </Button>
        <Button size="xs" onClick={onUpdate} disabled={onCreate && rowSelected && hasPlan ? false : true}>
          <Text size="xs">{t("crud.shipmentPlanner.button.editPlan")}</Text>
        </Button>
        <Button onClick={onBack} disabled={onBack === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default Toolbar;
