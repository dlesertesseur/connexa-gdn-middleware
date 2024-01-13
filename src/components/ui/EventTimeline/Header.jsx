import { Group, Stack } from "@mantine/core";

// eslint-disable-next-line react/prop-types
const Header = ({ children, h }) => {
  return (
    <Stack gap={0}>
      <Group h={h} gap={0}>
        {children}
      </Group>
    </Stack>
  );
};

export default Header;
