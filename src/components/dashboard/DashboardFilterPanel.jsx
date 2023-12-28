/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Select } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDashboardContext } from "../../context/DashboardContext";

const DashboardFilterPanel = () => {
  const [selected, setSelected] = useState(null);

  const { businessObjectives, businessObjectiveSelected, setBusinessObjectiveSelected, loadingTotalsData } =
    useDashboardContext();

  const { t } = useTranslation();

  useEffect(() => {
    setSelected(businessObjectiveSelected);
  }, []);

  const onAccept = () => {
    setBusinessObjectiveSelected(selected);
    close();
  };

  return (
    <Group justify="right">
      <Select
        disabled={loadingTotalsData}
        //label={t("importations.label.businessObjective")}
        searchable
        data={businessObjectives ? businessObjectives : []}
        value={selected}
        onChange={setSelected}
      />

      <Button disabled={loadingTotalsData} onClick={onAccept}>
        {t("general.button.accept")}
      </Button>
    </Group>
  );
};

export default DashboardFilterPanel;
