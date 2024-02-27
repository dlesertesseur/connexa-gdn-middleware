/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Alert, Center, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import { IconMoodHappy, IconMoodSad } from "@tabler/icons-react";
import { getIndicator } from "../../data/indicators";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LightIndicatorsPanel = ({ title = "NO TITLE", name, onclick }) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [data, setData] = useState(null);

  async function getData() {
    const list = [];

    const params = {
      token: user.token,
    };

    const ret = await getIndicator(name, params);
    if (ret) {
      list.push({ label: `${ret.numberOfShipmentsInRedColor} ${t("label.shipments")}`, data: ret.shipmentsInRedColor });
      list.push({
        label: `${ret.numberOfShipmentsInGreenColor} ${t("label.shipments")}`,
        data: ret.shipmentsInGreenColor,
      });
    }

    setData(list);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper
      p="xs"
      withBorder
      mih={200}
      onClick={() => {
        onclick(title, name, data);
      }}
    >
      <Stack>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            {title}
          </Text>
        </Group>

        {data ? (
          <>
            <Alert variant="light" color="red" title={data[0].label} icon={<IconMoodSad size={24} color="red" />} />
            {/* <Alert
              variant="light"
              color="yellow"
              title={data[1].label}
              icon={<IconMoodEmpty size={24} color="yellow" />}
            /> */}
            <Alert
              variant="light"
              color="green"
              title={data[1].label}
              icon={<IconMoodHappy size={24} color="green" />}
            />
          </>
        ) : (
          <Center mih={200}>
            <Loader />
          </Center>
        )}
      </Stack>
    </Paper>
  );
};

export default LightIndicatorsPanel;
