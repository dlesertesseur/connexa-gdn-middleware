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
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedMenu,
        setSelectedMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvier;
