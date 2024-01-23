import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { UserButton } from "./UserButton";
import { Outlet } from "react-router-dom";
import AppMenu from "./AppMenu";
import Logo from "./Logo";
import AppTitle from "./AppTitle";
import AppProvier from "../../context/AppContext";

// eslint-disable-next-line react/prop-types
export default function AppFrame() {
  const [mobileOpened, toggleMobile] = useDisclosure();
  const [desktopOpened, toggleDesktop] = useDisclosure(true);

  return (
    <AppProvier>
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
            <Group justify="center" >
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
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </AppProvier>
  );
}
