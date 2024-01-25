/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ActionIcon, Button, Group, Indicator, Popover, Select, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconFilter } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useShipmentContext } from "../../context/ShipmentContext";
import { useUserContext } from "../../context/UserContext";

const ShipmentFilterDialog = ({ opened, open, close }) => {
  const { t } = useTranslation();

  const {
    businessObjectiveSelected,
    analystSelected,
    businessObjectives,
    analysts,
    refreshData,
    setFilterData,
    loadingTotalsData,
    buyers,
    buyerSelected,
  } = useShipmentContext();

  const { user } = useUserContext();

  const [businessObjectiveSelectedLocal, setBusinessObjectiveSelectedLocal] = useState(null);
  const [analystSelectedLocal, setAnalystSelectedLocal] = useState(null);
  const [buyerSelectedLocal, setBuyerSelectedLocal] = useState(null);

  useEffect(() => {
    setBusinessObjectiveSelectedLocal(businessObjectiveSelected);
    setAnalystSelectedLocal(analystSelected);
    setBuyerSelectedLocal(buyerSelected);
  }, [opened]);

  const onAccept = () => {
    setFilterData(businessObjectiveSelectedLocal, analystSelectedLocal, buyerSelectedLocal);
    refreshData();
    close();
  };

  const disabledIndicator = () => {
    let ret = true;

    if (businessObjectiveSelected !== t("shipments.label.all") || analystSelected !== t("shipments.label.all")) {
      ret = false;
    }

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
            label={t("shipments.label.businessObjective")}
            searchable
            data={businessObjectives ? businessObjectives : []}
            value={businessObjectiveSelectedLocal}
            onChange={setBusinessObjectiveSelectedLocal}
          />

          <Select
            label={t("shipments.label.buyer")}
            searchable
            data={buyers ? buyers : []}
            value={buyerSelectedLocal}
            onChange={setBuyerSelectedLocal}
          />

          <Select
            disabled={user?.sidomkeys !== "*"}
            label={t("shipments.label.analyst")}
            searchable
            data={analysts ? analysts : []}
            value={analystSelectedLocal}
            onChange={setAnalystSelectedLocal}
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

export default ShipmentFilterDialog;
