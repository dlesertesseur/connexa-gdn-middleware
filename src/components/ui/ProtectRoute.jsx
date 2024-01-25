/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from "../../context/UserContext";
import { SigninForm } from "../signin/SigninForm";
import LoadingData from "./LoadingData";

const ProtectRoute = ({ children }) => {
  const { localDataLoaded, user } = useUserContext();

  let component = null;
  if (user) {
    component = children;
  } else {
    component = localDataLoaded ? <SigninForm /> : <LoadingData />;
  }

  return component;
};

export default ProtectRoute;
