import "./i18n";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import UserProvier from "./context/UserContext";
import ProtectRoute from "./components/ui/ProtectRoute";
import AppsModules from "./modules/AppsModules";

function App() {
  return (
    <MantineProvider>
      <Notifications/>
      <UserProvier>
        <ProtectRoute>
          <AppsModules />
        </ProtectRoute>
      </UserProvier>
    </MantineProvider>
  );
}

export default App;
