import { useViewportSize } from "@mantine/hooks";
import LocationMap from "./LocationMap";
import { useLayoutEffect, useState } from "react";

const Logistic = () => {
  const { height } = useViewportSize();
  const [map, setMap] = useState(null);
  
  useLayoutEffect(() => {
    if (height > 0) {
      setMap(<LocationMap h={height - 80} />);
    }
  }, [height]);

  return map;
};

export default Logistic;
