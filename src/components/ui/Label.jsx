/* eslint-disable react/prop-types */
import { Group, Stack, Text } from "@mantine/core";

const Label = ({ title, value, w }) => {
  return (
    <Stack gap={0}>
      <Text size="sm" fw={500} mb={2}>
        {title}
      </Text>
      <Group grow w={w} h={36} style={{ border: "1px solid #d5d5d5", borderRadius: 4 }} align="center" px={6}>
        <Text size="sm" fw={500}>
          {value}
        </Text>
      </Group>
    </Stack>
  );
};

export default Label;
