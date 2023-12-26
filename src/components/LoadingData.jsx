import { Box, Center, LoadingOverlay, Text } from "@mantine/core";

// eslint-disable-next-line react/prop-types
const LoadingData = ({ text = "Loading..." }) => {
  return (
    <Center>
      <Box pos="relative">
        <LoadingOverlay zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Text c="dimmed">{text}</Text>
      </Box>
    </Center>
  );
};

export default LoadingData;
