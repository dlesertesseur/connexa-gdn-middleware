/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { API_GDNAR, config } from "../data/config";
import { getAllUsers, getUserById } from "../data/user";

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
  const [users, setUsers] = useState(null);

  const getData = async () => {
    if (!user) {
      const localUserData = localStorage.getItem("user");
      if (localUserData) {
        try {
          const usr = await getUserById(user.id);
          if (!usr) {
            logOut();
          }
        } catch (error) {
          logOut();
        }
        setUser(JSON.parse(localUserData));
      }
    }
    setLocalDataLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    getData();
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

      const url = `${API_GDNAR}/authentications`;
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
          email: data.user.username,
          urlImage: data.user.image
            ? `${config.SERVER}:${config.PORT}${data.user.image}`
            : `${config.APP_PUBLIC_URL}/images/user.png`,
          token: data.token,
          roles: data.user.roles,
          sidomkeys: data.user.sidomkey,
          id: data.user.id,
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
      const res = await fetch(url);
      const data = await res.json();

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
    userLog("logout");
  };

  const getAll = async () => {
    const params = { token: user.token };
    const users = await getAllUsers(params);
    setUsers(users);
  };

  async function userLog(message) {
    if (user) {
      const body = JSON.stringify({
        dateAndTime: new Date(),
        source: `${user.lastname}, ${user.firstname}`,
        message: message,
      });

      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
        body: body,
      };

      const url = `${API_GDNAR}/log`;
      await fetch(url, requestOptions);
    }
  }

  return (
    <UserContext.Provider
      value={{
        localDataLoaded,
        user,
        error,
        authenticate,
        checkSession,
        logOut,
        getAll,
        users,
        userLog,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvier;
