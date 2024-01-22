/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Group, Text } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useTranslation } from "react-i18next";

const Toolbar = ({value, setValue}) => {
  const { t } = useTranslation();

  return (
    <Group justify="space-between">
      <Group gap={"xs"} wrap="nowrap">
      <Text fw={600} size="md">{t("masterPlan.label.seeYear")}</Text>
        <YearPickerInput value={value} onChange={setValue} />
      </Group>
    </Group>
  );
};

export default Toolbar;
