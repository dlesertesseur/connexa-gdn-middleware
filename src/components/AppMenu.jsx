/* eslint-disable react-hooks/exhaustive-deps */
import { Accordion, ScrollArea, Stack } from "@mantine/core";
import { MODULE_APPS_ROOT } from "../data/config";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { IconApps } from "@tabler/icons-react";
import AppItem from "./AppItem";

const AppMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menu, setMenu] = useState(null);
  const [roleDefault, setRoleDefault] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    if (user && user.roles) {
      const menu = [];
      const roles = user.roles;

      for (let index = 0; index < roles.length; index++) {
        const rol = roles[index];
        const option = (
          <Accordion.Item key={rol.name} value={rol.name}>
            <Accordion.Control icon={<IconApps size={20} />}>{rol.name}</Accordion.Control>
            <Accordion.Panel>
              <Stack align="flex-start" gap={"xs"}>
                {rol.applications.map((app) => {
                  const ret = (
                    <AppItem
                      key={app.id}
                      id={app.id}
                      name={app.name}
                      description={app.description}
                      href={`${MODULE_APPS_ROOT}${app.path}`}
                      selected={app.id === selectedMenu}
                      setSelected={setSelectedMenu}
                    />
                  );
                  return ret;
                })}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        );

        if (roles.length > 0) {
          setRoleDefault(roles[0].name);
        }
        menu.push(option);
      }

      setMenu(menu);
    }
  }, [user, selectedMenu]);

  return (
    <ScrollArea w={"100%"} h={"100%"}>
      {roleDefault ? (
        <Accordion variant="default" defaultValue={roleDefault}>
          {menu}
        </Accordion>
      ) : null}
    </ScrollArea>
  );
};

export default AppMenu;
