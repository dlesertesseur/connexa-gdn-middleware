/* eslint-disable react-hooks/exhaustive-deps */
import { Group, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { useDashboardContext } from "../../context/DashboardContext";
import DashboardFilterDialog from "./DashboardFilterDialog";
import Chart from "./Chart";

const Dashboard = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const { businessObjectiveSelected, getChartByBusinessObjective } = useDashboardContext();
  const { height } = useViewportSize();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (businessObjectiveSelected) {
      const chartData = getChartByBusinessObjective(businessObjectiveSelected);
      setChart(<Chart chartData={chartData} />);
    }
  }, [businessObjectiveSelected]);

  const onRefresh = (id) => {
    console.log("onRefresh id -> ", id);
  };

  return (
    <Stack spacing={0} h={height - 80}>
      <Group justify="flex-start" mb={"md"}>
        <Group align="center">
          <DashboardFilterDialog
            opened={filterOpen}
            open={() => {
              setFilterOpen(true);
            }}
            close={() => {
              setFilterOpen(false);
            }}
            onRefresh={onRefresh}
          />
        </Group>

        <Group align="center">
          {businessObjectiveSelected ? <Title order={4}>{businessObjectiveSelected}</Title> : null}
        </Group>
      </Group>
      {chart}
    </Stack>
  );
};

export default Dashboard;
