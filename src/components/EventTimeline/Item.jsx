import { Stack} from "@mantine/core";

// eslint-disable-next-line react/prop-types
const Item = ({ children, selected=false, bg }) => {
  return (
    <Stack gap={0} bg={selected ? "blue.3" : bg} style={{ borderBottom: "1px solid #C5C5C5" }}>
      {children}
    </Stack>
  );
};

export default Item;
