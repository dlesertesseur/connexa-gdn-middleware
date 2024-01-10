import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEventContext = () => {
  const ctx = useContext(EventContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const EventProvider = ({ children }) => {
  const [user, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <EventContext.Provider value={{ loading, user, error }}>{children}</EventContext.Provider>;
};

export default EventProvider;
