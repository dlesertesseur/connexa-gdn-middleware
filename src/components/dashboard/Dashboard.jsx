/* eslint-disable react-hooks/exhaustive-deps */
import { Group, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { useDashboardContext } from "../../context/DashboardContext";
import DashboardFilterPanel from "./DashboardFilterPanel";
import Chart from "./Chart";

const Dashboard = () => {
  // const [filterOpen, setFilterOpen] = useState(false);

  const { businessObjectiveSelected, getChartByBusinessObjective } = useDashboardContext();
  const { height } = useViewportSize();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (businessObjectiveSelected) {
      const chartData = getChartByBusinessObjective(businessObjectiveSelected);
      setChart(<Chart chartData={chartData} />);
    }
  }, [businessObjectiveSelected]);

  return (
    <Stack spacing={0} h={height - 80}>
      <Group justify="flex-start" mb={"md"}>
        <Group align="center">
          <DashboardFilterPanel />
        </Group>
      </Group>
      {chart}
    </Stack>
  );
};

export default Dashboard;
