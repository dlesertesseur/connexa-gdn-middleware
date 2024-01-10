/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { findAllBusinessGoals } from "../../data/businessGoals";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import EventTimeline from "../EventTimeline";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { height } = useViewportSize();
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  const { user } = useUserContext();

  async function getData() {
    const params = { token: user.token };
    const data = await findAllBusinessGoals(params);
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map(m => m.name);

  return (
    <Stack spacing={0} h={height - 80}>
      {/* <Group justify="flex-start" mb={"md"}>
        <Group align="center">
          <DashboardFilterPanel />
        </Group>
      </Group> */}
      <EventTimeline startYear={2022} endYear={2024} data={data} h={500} cw={120} monthLabels={monthLabels}/>
    </Stack>
  );
};

export default Dashboard;
