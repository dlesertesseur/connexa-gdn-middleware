/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {  Group, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { activeApp } = useAppContext();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const app = activeApp();
    setApp(app);
  }, []);

  return (
    <Group pb={"xs"} justify="space-between" style={{ borderBottom: "1px solid #C5C5C5" }} h={40}>
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{app?.name}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
      </Group>
    </Group>
  );
};

export default Header;
