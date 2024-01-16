/* eslint-disable react/prop-types */
import { Box } from "@mantine/core";

const Layer = ({ h, w, left, color }) => {
  return (
    <Box
      left={left}
      onClick={(e) => {
        e.evt.preventDefault();
      }}
      w={w}
      pos={"absolute"}
      h={h}
      gap={0}
      bg={color}
      style={{ pointerEvents: "none" }}
    ></Box>
  );
};

export default Layer;
