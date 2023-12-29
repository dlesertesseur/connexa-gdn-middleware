import { useViewportSize } from "@mantine/hooks";
import { useLayoutEffect, useState } from "react";
import LocationMap from "./LocationMap";

const Logistic = () => {
  const { height } = useViewportSize();
  const [map, setMap] = useState(null);
  
  useLayoutEffect(() => {
    if (height > 0) {
      setMap(<LocationMap h={height - 140} />);
    }
  }, [height]);

  return map;
};

export default Logistic;
