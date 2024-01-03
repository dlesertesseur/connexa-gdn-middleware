/* eslint-disable react/prop-types */
import { Group, Paper, Text } from "@mantine/core";

const ShipmentTotalValue = ({ value }) => {
  return (
    <Paper py={"xs"} w={160} h={100} radius="md" bg={"blue.1"} shadow={"0px"}>
      <Group justify="center" align="center" h={"100%"}>
        <Text align="center" fw={700} size="56px" c={"blue"}>
          {value}
        </Text>
      </Group>
    </Paper>
  );
};

export default ShipmentTotalValue;
