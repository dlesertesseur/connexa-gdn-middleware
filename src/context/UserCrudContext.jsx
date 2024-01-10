import { createContext, useContext, useState } from "react";
import { getAllUsers } from "../data/user";
import { useUserContext } from "./UserContext";

const UserCrudContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserCrudContext = () => {
  const ctx = useContext(UserCrudContext);
  return ctx;
};

// eslint-disable-next-line react/prop-types
const UserCrudProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const {user} = useUserContext();

  const getAll = async () => {
    const params = { token: user.token };
    const users = await getAllUsers(params);
    setUsers(users);
  };

  return (
    <UserCrudContext.Provider value={{ loading, error, getAll, users }}>
      {children}
    </UserCrudContext.Provider>
  );
};

export default UserCrudProvider;
