import { Stack } from "@mantine/core";

// eslint-disable-next-line react/prop-types
const Item = ({ children, id, selected = false, bg, onClick, miw }) => {
  return (
    <Stack
      gap={0}
      bg={selected ? "blue.2" : bg}
      style={{ borderBottom: "1px solid #C5C5C5" }}
      onClick={() => {
        onClick(id);
      }}
      miw={miw}
    >
      {children}
    </Stack>
  );
};

export default Item;
