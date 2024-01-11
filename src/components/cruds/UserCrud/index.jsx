import { Outlet } from "react-router-dom";
import { useUserCrudContext } from "../../../context/UserCrudContext";
import { useEffect } from "react";

const UserCrud = () => {
  const { initData } = useUserCrudContext();
  
  useEffect(() => {

    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Outlet />;
};

export default UserCrud;
