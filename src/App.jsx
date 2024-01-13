import "./i18n";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import UserProvier from "./context/UserContext";
import ProtectRoute from "./components/ui/ProtectRoute";
import AppsModules from "./modules/AppsModules";

function App() {
  return (
    <MantineProvider>
      <UserProvier>
        <ProtectRoute>
          <AppsModules />
        </ProtectRoute>
      </UserProvier>
    </MantineProvider>
  );
}

export default App;
