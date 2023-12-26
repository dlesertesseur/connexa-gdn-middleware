import "./i18n";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import UserProvier from "./context/UserContext";
import AppsModules from "./modules/AppsModules";
import ProtectRoute from "./components/ProtectRoute";

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
