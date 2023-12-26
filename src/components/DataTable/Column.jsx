import { Group, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
const Column = ({ id, text, w, selected, sortOrder, onClick, lastColumn }) => {
  const rBorder = !lastColumn ? "1px solid #C5C5C5" : null;
  return (
    <Group
      gap={0}
      justify={"center"}
      h={"100%"}
      w={w}
      bg={selected ? "blue.1" : "blue.2"}
      px={3}
      onClick={() => {
        onClick(id);
      }}
      style={{borderRight:rBorder, borderBottom:"1px solid #C5C5C5"}}
    >
      <Group justify={"center"}>
        <Text fw={500}>{text}</Text>
      </Group>
      {selected ? (
        <Group justify={"center"} ml={5}>
          {sortOrder === "asc" ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </Group>
      ) : null}
    </Group>
  );
};

export default Column;
