/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const PanelHeader = ({ title, subTitle, onBack }) => {
  const { t } = useTranslation();

  return (
    <Group pb={"xs"} justify="space-between" style={{ borderBottom: "1px solid #C5C5C5" }}>
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{`${title} ${subTitle ? `/ ${subTitle}` : ""}`}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
        <Button onClick={onBack} disabled={onBack === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default PanelHeader;
