/* eslint-disable react/prop-types */
import { Box } from "@mantine/core";

const Layer = ({ h, w, left, color, border = false, borderColor = "red", borderWidth=2 }) => {
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
      style={{
        pointerEvents: "none",
        borderLeft: border ? `dashed ${borderWidth}px ${borderColor}` : "none",
        borderRight: border ? `dashed ${borderWidth}px ${borderColor}` : "none",
      }}
    ></Box>
  );
};

export default Layer;
