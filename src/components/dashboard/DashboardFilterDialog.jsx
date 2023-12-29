/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ActionIcon, Button, Group, Indicator, Popover, Select, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconFilter } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDashboardContext } from "../../context/DashboardContext";

const DashboardFilterDialog = ({ opened, open, close }) => {
  const [selected, setSelected] = useState(null);

  const { businessObjectiveSelected, setBusinessObjectiveSelected, loadingTotalsData } =
    useDashboardContext();

  const { t } = useTranslation();

  useEffect(() => {
    setSelected(businessObjectiveSelected);
  }, []);

  const onAccept = () => {
    setBusinessObjectiveSelected(selected);
    close();
  };

  const disabledIndicator = () => {
    let ret = true;

    return ret;
  };

  return (
    <Popover width={400} position="bottom-start" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Indicator offset={2} size={14} position={"top-end"} color={"red"} withBorder disabled={disabledIndicator()}>
          <ActionIcon disabled={loadingTotalsData} variant="filled" color="blue" onClick={open}>
            <IconFilter size={16} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Select
            label={t("importations.label.businessObjective")}
            searchable
            data={[]}
            value={selected}
            onChange={setSelected}
          />

          <Group justify="right" mt={"xs"}>
            <Button onClick={onAccept}>{t("general.button.accept")}</Button>
            <Button onClick={close}>{t("general.button.close")}</Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DashboardFilterDialog;
