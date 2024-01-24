import { Avatar, Text, Menu, UnstyledButton, Group } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconForms, IconLogout, IconPasswordUser } from "@tabler/icons-react";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MODULE_APPS_ROOT } from "../../data/config";
import { useAppContext } from "../../context/AppContext";

export function UserButton() {
  const [opened, setOpened] = useState(false);
  const { user, logOut } = useUserContext();
  const { setChangePasswordOpened, setUserInfoOpened } = useAppContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLogout = () => {
    logOut();
    setOpened(false);
    navigate(`${MODULE_APPS_ROOT}`);
  };

  const onUserInfo = () => {
    setOpened(false);
    setUserInfoOpened(true);
  };

  const onChangePassword = () => {
    setOpened(false);
    setChangePasswordOpened(true);
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
        <Menu.Item leftSection={<IconForms size={16} />} onClick={onUserInfo}>
          {t("general.button.account")}
        </Menu.Item>
        <Menu.Item leftSection={<IconPasswordUser size={16} />} onClick={onChangePassword}>
          {t("general.button.changePassword")}
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout size={16} />} onClick={onLogout}>
          {t("general.button.signOut")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
