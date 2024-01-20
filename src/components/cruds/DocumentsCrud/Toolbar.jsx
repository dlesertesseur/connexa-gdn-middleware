/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../context/AppContext";
import { useEffect, useState } from "react";

const Toolbar = ({rowSelected, buyer, open, confirm }) => {
  const { t } = useTranslation();
  const { activeApp } = useAppContext();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const app = activeApp();
    setApp(app);
  }, []);
  
  const onUpdate = () => {
    open();
  };
  const onDelete = () => {
    confirm();
  };

  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{app?.name}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
        <Button size="xs" onClick={onUpdate} disabled={onUpdate && rowSelected && !buyer ? false : true} leftSection={<IconUserPlus size={16}/>}>
          <Text size="xs">{t("crud.documents.button.assignBuyer")}</Text>
        </Button>
        <Button size="xs" onClick={onDelete} disabled={onDelete && rowSelected && buyer? false : true} leftSection={<IconUserMinus size={16}/>}>
          <Text size="xs">{t("crud.documents.button.removeBuyer")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default Toolbar;
