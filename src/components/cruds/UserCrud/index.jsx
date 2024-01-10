import { Outlet } from "react-router-dom"
import UserCrudProvider from "../../../context/UserCrudContext"

const UserCrud = () => {
  return (
    <UserCrudProvider>
      <Outlet/>
    </UserCrudProvider>
  )
}

export default UserCrud