import { ScrollArea, Stack } from "@mantine/core";
import AppItem from "./AppItem";
import { MODULE_APPS_ROOT } from "../data/config";
import { useState } from "react";

const AppMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const items = [
    {
      id: "Dashboard",
      name: "Dashboard",
      description: "Monitor del estado general de procesos",
      href: `${MODULE_APPS_ROOT}/dashboard`,
    },
    {
      id: "Importaciones",
      name: "Importaciones",
      description: "Monitor del estado actual de las importaciones",
      href: `${MODULE_APPS_ROOT}/importations`,
    },
    // {
    //   id: "Logistica",
    //   name: "Logistica",
    //   description: "Monitor del estado actual de la logistica",
    //   href: `${MODULE_APPS_ROOT}/logistics`,
    // },
  ];
  return (
    <ScrollArea w={"100%"} h={"100%"}>
      <Stack align="flex-start" w={"100%"}>
        {items.map((i) => {
          const ret = (
            <AppItem
              key={i.id}
              id={i.id}
              name={i.name}
              description={i.description}
              href={i.href}
              selected={i.id === selectedMenu}
              setSelected={setSelectedMenu}
            />
          );
          return ret;
        })}
      </Stack>
    </ScrollArea>
  );
};

export default AppMenu;
