/* eslint-disable react/prop-types */
import { Group } from "@mantine/core";

const Row = ({ children, id, selected = false, order, onClick }) => {
  const bgColor = order % 2 === 0 ? "white" : "gray.2"
  return (
    <Group gap={0} bg={selected ? "orange.3" : bgColor}  onClick={() => {onClick(id)}} align="flex-start">
      {children}
    </Group>
  );
};

export default Row;
