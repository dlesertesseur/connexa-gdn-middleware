import { ScrollArea, Stack } from "@mantine/core";
import AppItem from "./AppItem";
import { MODULE_APPS_ROOT } from "../data/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AppMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const {t} = useTranslation();

  const items = t("menu.options", { returnObjects: true });

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
              href={`${MODULE_APPS_ROOT}/${i.module}`}
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
