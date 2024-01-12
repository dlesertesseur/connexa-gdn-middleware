/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const CrudToolbar = ({ title, onCreate, onUpdate, onDelete, onBack, rowSelected }) => {
  const { t } = useTranslation();
  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>
          {title}
        </Title>
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
        <Button onClick={onBack} disabled={onBack === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default CrudToolbar;
