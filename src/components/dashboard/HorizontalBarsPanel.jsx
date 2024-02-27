/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Center, Group, Loader, Paper, Progress, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { getIndicator } from "../../data/indicators";

// eslint-disable-next-line no-unused-vars
const HorizontalBarsPanel = ({ title = "NO TITLE", color = "blue", name, onclick=null }) => {
  const { user } = useUserContext();
  const [data, setData] = useState(null);

  async function getData() {
    let list = null;

    const params = {
      token: user.token,
    };

    const ret = await getIndicator(name, params);

    if (ret && ret.bars) {
      const total = ret.bars.reduce((acc, o) => acc + o.total, 0);
      list = ret.bars.map((i) => {
        const label = `${(Math.round(i.total) / 1000000).toFixed(2)} M`;
        const percentage = (i.total * 100) / total;
        const ret = { title: i.name, value: percentage, label: label };
        return ret;
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
      h={200}
      onClick={() => {
        //onclick(title, name, data);
      }}
    >
      <Stack>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            {title}
          </Text>
        </Group>

        <ScrollArea h={150}>
          {data ? (
            <Table withRowBorders={false}>
              <Table.Tbody>
                {data.map((r) => {
                  const ret = (
                    <Table.Tr key={r.title}>
                      <Table.Td>
                        <Text size="xs" style={{ whiteSpace: "nowrap" }}>
                          {r.title}
                        </Text>
                      </Table.Td>
                      <Table.Td w={"100%"}>
                        <Box
                          style={{
                            position: "relative",
                          }}
                        >
                          <Progress.Root h={30} size="xl">
                            <Progress.Section value={r.value} color={color}></Progress.Section>
                          </Progress.Root>
                          <Group
                            h={30}
                            w={"100%"}
                            align="center"
                            style={{
                              position: "absolute",
                              top: "0px",
                              //zIndex: 100,
                              // border:"solid 1px red",
                              textAlign: "center",
                            }}
                          >
                            <Text w={"100%"} size="mb">
                              {r.label}
                            </Text>
                          </Group>
                        </Box>
                      </Table.Td>
                    </Table.Tr>
                  );
                  return ret;
                })}
              </Table.Tbody>
            </Table>
          ) : (
            <Center mih={200}>
              <Loader />
            </Center>
          )}
        </ScrollArea>
      </Stack>
    </Paper>
  );
};

export default HorizontalBarsPanel;
