import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { UserButton } from "./UserButton";
import AppMenu from "./AppMenu";
import Logo from "./Logo";
import AppTitle from "./AppTitle";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AppFrame() {
  const [mobileOpened, toggleMobile] = useDisclosure();
  const [desktopOpened, toggleDesktop] = useDisclosure(true);

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
        <Group justify="space-between" align="center" px={"xs"}>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile.toggle} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop.toggle} visibleFrom="sm" size="sm" />
          </Group>
          <Group>
            <Logo image={"/logos/logo.png"} size={60} />
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
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
