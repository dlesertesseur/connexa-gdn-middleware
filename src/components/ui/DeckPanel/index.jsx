/* eslint-disable react/prop-types */
import { Box, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

const DeckPanel = ({ w, h, bg, children, activeComponent }) => {
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
    <Box>
      <Stack h={h ? h : null} w={w ? w : null} bg={bg}>
        {component}
      </Stack>
    </Box>
  );
};

export default DeckPanel;
