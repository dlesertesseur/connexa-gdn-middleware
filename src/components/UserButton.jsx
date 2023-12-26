import { Avatar, Text, Menu, UnstyledButton, Group } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconLogout } from "@tabler/icons-react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";

export function UserButton() {
  const { user, logOut } = useUserContext();
  const [opened, setOpened] = useState(false);

  const { t } = useTranslation();

  const onLogout = () => {
    logOut();
    setOpened(false);
    console.log("onLogout -> ");
  };

  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton
          onClick={() => {
            setOpened(!opened);
          }}
        >
          <Group>
            <Avatar src={`${user?.urlImage}`} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {`${user?.lastname}, ${user?.firstname}`}
              </Text>

              <Text c="dimmed" size="xs">
                {`${user?.email}`}
              </Text>
            </div>

            {opened ? <IconChevronUp size={16} stroke={1.5} /> : <IconChevronDown size={16} stroke={1.5} />}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconLogout size={16} />} onClick={onLogout}>
          {t("general.button.signOut")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
