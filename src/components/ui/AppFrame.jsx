/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { UserButton } from "./UserButton";
import { Outlet, useNavigate } from "react-router-dom";
import AppMenu from "./AppMenu";
import Logo from "./Logo";
import AppTitle from "./AppTitle";
import { useAppContext } from "../../context/AppContext";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { MODULE_APPS_ROOT } from "../../data/config";
import ChangePassword from "../changePassword";
import UserInfo from "../userInfo";

// eslint-disable-next-line react/prop-types
export default function AppFrame() {
  const navigate = useNavigate();
  const [mobileOpened, toggleMobile] = useDisclosure();
  const [desktopOpened, toggleDesktop] = useDisclosure(true);

  const { user } = useUserContext();
  const { setMenuItem, changePasswordOpened, setChangePasswordOpened, userInfoOpened, setUserInfoOpened } =
    useAppContext();

  useEffect(() => {
    const roles = user.roles;
    if (roles) {
      const rol = roles[0];
      const apps = rol.applications;
      if (apps) {
        const app = apps[0];
        setMenuItem(app.id);
        navigate(`${MODULE_APPS_ROOT}${app.path}`);
      }
    }
  }, [user]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="xs"
    >
      <AppShell.Header>
        <Group gap={0} justify="space-between" align="center" px={"xs"} h={"100%"}>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile.toggle} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop.toggle} visibleFrom="sm" size="sm" />
          </Group>
          <Group justify="center">
            <Logo image={"/logos/logo.png"} size={50} />
            <AppTitle />
          </Group>
          <Group>
            <UserButton />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppMenu />
      </AppShell.Navbar>

      <AppShell.Main>
        <ChangePassword
          opened={changePasswordOpened}
          close={() => {
            setChangePasswordOpened(false);
          }}
        />
        <UserInfo
          opened={userInfoOpened}
          close={() => {
            setUserInfoOpened(false);
          }}
        />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
