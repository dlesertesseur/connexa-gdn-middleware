/* eslint-disable react/prop-types */
import { Group } from "@mantine/core";

const Row = ({ children, id, selected = false, order, onClick, onDoubleClick }) => {
  const bgColor = order % 2 === 0 ? "white" : "gray.1";
  return (
    <Group
      gap={0}
      bg={selected ? "blue.2" : bgColor}
      onMouseDown={() => {
        onClick(id);
      }}
      onDoubleClick={() => {
        onDoubleClick(id);
      }}
      align="flex-start"
    >
      {children}
    </Group>
  );
};

export default Row;
