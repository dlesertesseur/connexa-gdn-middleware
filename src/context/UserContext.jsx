import { createContext, useContext, useEffect, useState } from "react";
import { API_ADMIN, config } from "../data/config";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const ctx = useContext(UserContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const UserProvier = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      const localUserData = localStorage.getItem("user");
      if (localUserData) {
        setUser(JSON.parse(localUserData));
      }
    }
    setLocalDataLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticate = async (parameters) => {
    try {
      const body = JSON.stringify({
        email: parameters.email,
        password: parameters.password,
      });

      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      const url = `${API_ADMIN}/authentication`;
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (data.error) {
        console.log(data);
        setError(data.error);
      } else {
        setError(null);

        const obj = {
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          urlImage: `${config.SERVER}:${config.PORT}${data.user.image}`,
          token:data.token,
          id: data.id
        };

        const ud = JSON.stringify(obj);
        window.localStorage.setItem("user", ud);

        setUser(obj);
      }

      return data;
    } catch (error) {
      return error;
    }
  };

  const checkSession = async () => {
    let active = false;
    try {
      const url = "/api/auth";
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      console.log("checkSession Context data -> ", data.session);

      if (data.error) {
        console.log(data);
        setError(data.error);
      } else {
        setError(null);
        if (data.session) {
          active = true;
        }
      }

      return active;
    } catch (error) {
      return error;
    }
  };

  const logOut = () => {
    setError(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ localDataLoaded, user, error, authenticate, checkSession, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvier;
