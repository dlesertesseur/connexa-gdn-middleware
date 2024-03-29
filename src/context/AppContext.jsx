/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const AppProvier = ({ children }) => {
  const [menuItem, setMenuItem] = useState(null);
  const [appById, setAppById] = useState(null);
  const [changePasswordOpened, setChangePasswordOpened] = useState(false);
  const [userInfoOpened, setUserInfoOpened] = useState(false);

  function activeApp() {
    let app = null;
    if (appById) {
      app = appById.get(menuItem);
    }

    return app;
  }

  return (
    <AppContext.Provider
      value={{
        menuItem,
        setMenuItem,
        appById,
        setAppById,
        activeApp,
        changePasswordOpened,
        setChangePasswordOpened,
        userInfoOpened,
        setUserInfoOpened,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvier;
