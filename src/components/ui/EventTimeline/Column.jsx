import { Group, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
const Column = ({ id, label, text, w, selected, sortOrder, onClick, lastColumn }) => {
  const rBorder = !lastColumn ? "1px solid #C5C5C5" : null;
  return (
    <Group
      gap={0}
      justify={"center"}
      h={"100%"}
      w={w}
      bg={selected ? "gray.2" : "gray.1"}
      px={3}
      onClick={() => {
        onClick(id);
      }}
      style={{ borderRight: rBorder, borderBottom: "1px solid #C5C5C5", borderTop: "1px solid #C5C5C5" }}
    >
      <Stack gap={0}>
        {label ? (
          <Group justify={"center"}>
            <Text fw={"bold"} size="xs">
              {label ? label : "<NO DEF>"}
            </Text>
          </Group>
        ) : null}
        <Group justify={"center"}>
          <Text fw={"normal"} size="xs">
            {text}
          </Text>
        </Group>
      </Stack>
      {selected ? (
        <Group justify={"center"} ml={5}>
          {sortOrder === "asc" ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </Group>
      ) : null}
    </Group>
  );
};

export default Column;
