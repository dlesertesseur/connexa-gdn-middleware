/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useBuyerCrudContext } from "../../../context/BuyerCrudContext";
import { useAppContext } from "../../../context/AppContext";
import { useEffect, useState } from "react";

const CrudToolbar = ({ rowSelected }) => {
  const { t } = useTranslation();
  const { setActiveComponent } = useBuyerCrudContext();
  const { activeApp } = useAppContext();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const app = activeApp();
    setApp(app);
  }, []);

  const onCreate = () => {
    setActiveComponent("create");
  };
  const onUpdate = () => {
    setActiveComponent("update");
  };
  const onDelete = () => {
    setActiveComponent("delete");
  };

  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{app?.name}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
        <Button size="xs" onClick={onCreate} disabled={onCreate ? false : true}>
          <Text size="xs">{t("general.button.create")}</Text>
        </Button>
        <Button size="xs" onClick={onUpdate} disabled={onUpdate && rowSelected ? false : true}>
          <Text size="xs">{t("general.button.update")}</Text>
        </Button>
        <Button size="xs" onClick={onDelete} disabled={onDelete && rowSelected ? false : true}>
          <Text size="xs">{t("general.button.delete")}</Text>
        </Button>
        {/* <Button onClick={onBack} disabled={onBack === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button> */}
      </Group>
    </Group>
  );
};

export default CrudToolbar;
