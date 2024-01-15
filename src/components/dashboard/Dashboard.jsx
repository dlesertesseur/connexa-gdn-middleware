/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

const Dashboard = () => {
  const { height } = useViewportSize();
  // const { t } = useTranslation();
  // const [data, setData] = useState(null);

  // const { user } = useUserContext();

  // async function getData() {
  //   const params = { token: user.token };
  //   const data = await findAllBusinessGoals(params);
  //   setData(data);
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  // const months = t("months", { returnObjects: true });
  // const monthLabels = months.map(m => m.name);

  return (
    <Stack spacing={0} h={height - 80}>
      {/* <Group justify="flex-start" mb={"md"}>
        <Group align="center">
          <DashboardFilterPanel />
        </Group>
      </Group> */}
    </Stack>
  );
};

export default Dashboard;
