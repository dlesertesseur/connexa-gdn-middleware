/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import {
  addRoleToUser,
  createUser,
  getAllRoles,
  getAllUsers,
  getRolesByUserId,
  getUserById,
  removeRoleFromUser,
  removeUser,
  updateUser,
} from "../data/user";
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
  const [roles, setRoles] = useState(null);
  const [reload, setReload] = useState(Date.now());
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { user } = useUserContext();

  const getAll = async () => {
    const params = { token: user.token };
    const users = await getAllUsers(params);
    setUsers(users);
  };

  async function initData() {
    setLoading(true);
    const params = { token: user.token };
    const ret = await getAllRoles(params);
    setRoles(ret);
    setLoading(false);
  }

  const getById = async (id) => {
    let ret = null;
    try {
      const params = { token: user.token, id: id };

      console.log("params ->", params);

      ret = await getUserById(params);

      const roles = await getRolesByUserId(params);
      ret.roles = roles;
    } catch (error) {
      console.log(error);
      setError(error);
    }

    return ret;
  };

  function reloadData() {
    setReload(Date.now());
  }

  async function create(values, selectedRoles) {
    let ret = null;
    const roleIds = selectedRoles.map((r) => r.id);
    const params = { token: user.token, user: values };
    try {
      ret = await createUser(params);

      for (let index = 0; index < roleIds.length; index++) {
        const roleId = roleIds[index];
        await addRole(ret.id, roleId);
      }
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function update(userId, values) {
    let ret = null;
    const params = { token: user.token, userId: userId, values: values };
    try {
      ret = await updateUser(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function remove(id) {
    const params = { token: user.token, id: id };
    try {
      await removeUser(params);
    } catch (error) {
      setError(error);
    }
  }

  async function addRole(userId, roleId) {
    let ret = null;
    const params = { token: user.token, userId: userId, roleId: roleId };
    try {
      ret = await addRoleToUser(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  async function removeRole(userId, roleId) {
    let ret = null;
    const params = { token: user.token, userId: userId, roleId: roleId };
    try {
      ret = await removeRoleFromUser(params);
    } catch (error) {
      setError(error);
    }
    return ret;
  }

  function clearError() {
    setError(null);
  }

  return (
    <UserCrudContext.Provider
      value={{
        loading,
        error,
        getAll,
        getById,
        create,
        update,
        remove,
        addRole,
        removeRole,
        initData,
        reloadData,
        clearError,
        reload,
        users,
        roles,
        selectedUserId,
        setSelectedUserId,
      }}
    >
      {children}
    </UserCrudContext.Provider>
  );
};

export default UserCrudProvider;
