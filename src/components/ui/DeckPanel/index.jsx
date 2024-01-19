/* eslint-disable react/prop-types */
import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

const DeckPanel = ({ w, h, children, activeComponent }) => {
  const { height, width } = useViewportSize();
  const [component, setComponent] = useState(null);
  const [componentBykey, setComponentBykey] = useState(null);

  useEffect(() => {
    if (children && children.length > 0) {
      const componentBykey = new Map();
      children.forEach((c) => {
        componentBykey.set(c.key, c);
      });
      setComponentBykey(componentBykey);
    }
  }, [children]);

  useEffect(() => {
    if (activeComponent && componentBykey) {
      const component = componentBykey.get(activeComponent);
      if (component) {
        setComponent(component);
      }
    }
  }, [activeComponent, componentBykey]);

  return (
    <Box h = {h ? h : height} w={w ? w : width} >
      {component}
    </Box>
  );
};

export default DeckPanel;
