import { useViewportSize } from "@mantine/hooks";
import { Stack } from "@mantine/core";
import LocationMap from "./LocationMap";

const Logistic = () => {
  const { height } = useViewportSize();
  return (
    <Stack h={height - 80} bg={"teal.2"}>
      <LocationMap/>
    </Stack>
  );
};

export default Logistic;
