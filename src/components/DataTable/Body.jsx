/* eslint-disable react/prop-types */
import { Stack } from "@mantine/core";

const Body = ({ h, children }) => {
  return (
    <Stack h={h} gap={0}>
      {children}
    </Stack>
  );
};

export default Body;
