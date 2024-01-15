import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MODULE_APPS_ROOT } from "../data/config";
import ErrorPage from "./ErrorPage";
import AppFrame from "../components/ui/AppFrame";
import ProtectRoute from "../components/ui/ProtectRoute";
import Dashboard from "../components/dashboard/Dashboard";
import DashboardProvier from "../context/DashboardContext";
import Logistic from "../components/logistic/Logistic";
import Shipments from "../components/shipments/Shipments";
import ShipmentsPanel from "../components/shipments/ShipmentsPanel";
import ShipmentStatusDetail from "../components/shipments/ShipmentStatusDetail";
import ShipmentProductsDetail from "../components/shipments/ShipmentProductsDetail";
import ShipmentDetail from "../components/shipments/ShipmentDetail";
import DocumentDetail from "../components/shipments/DocumentDetail";
import EventCrud from "../components/cruds/EventCrud";
import UserCrud from "../components/cruds/UserCrud";
import EventList from "../components/cruds/EventCrud/EventList";
import EventPanel from "../components/cruds/EventCrud/EventPanel";
import UserList from "../components/cruds/UserCrud/UserList";
import UserPanel from "../components/cruds/UserCrud/UserPanel";
import UserCrudProvider from "../context/UserCrudContext";
import CreateUserPanel from "../components/cruds/UserCrud/CreateUserPanel";
import UserInfo from "../components/userInfo";
import ChangePassword from "../components/changePassword";
import ShipmentPlanner from "../components/cruds/ShipmentPlanner";
import ShipmentPlannerProvier from "../context/ShipmentPlannerContext";
import ShipmentPlannerPanel from "../components/cruds/ShipmentPlanner/ShipmentPlannerPanel";

const AppsModules = () => {
  const router = createBrowserRouter([
    {
      path: `${MODULE_APPS_ROOT}/`,
      element: (
        <ProtectRoute>
          <AppFrame />
        </ProtectRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: `${MODULE_APPS_ROOT}/`,
          element: (
            <DashboardProvier>
              <Dashboard />
            </DashboardProvier>
          ),
          errorElement: <ErrorPage />,
        },

        {
          path: `${MODULE_APPS_ROOT}/user-info`,
          element: <UserInfo />,
          errorElement: <ErrorPage />,
        },

        {
          path: `${MODULE_APPS_ROOT}/change-password`,
          element: <ChangePassword />,
          errorElement: <ErrorPage />,
        },
        {
          path: `${MODULE_APPS_ROOT}/crud/users`,
          element: (
            <UserCrudProvider>
              <UserCrud />
            </UserCrudProvider>
          ),
          errorElement: <ErrorPage />,
          children: [
            {
              path: `${MODULE_APPS_ROOT}/crud/users/`,
              element: <UserList />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/crud/users/create`,
              element: <CreateUserPanel />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/crud/users/update`,
              element: <UserPanel mode={"update"} />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/crud/users/delete`,
              element: <UserPanel mode={"delete"} />,
              errorElement: <ErrorPage />,
            },
          ],
        },
        {
          path: `${MODULE_APPS_ROOT}/crud/events`,
          element: <EventCrud />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: `${MODULE_APPS_ROOT}/crud/events/`,
              element: <EventList />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/crud/events/create`,
              element: <EventPanel mode={"create"} />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/crud/events/update`,
              element: <EventPanel mode={"update"} />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/crud/events/delete`,
              element: <EventPanel mode={"delete"} />,
              errorElement: <ErrorPage />,
            },
          ],
        },
        {
          path: `${MODULE_APPS_ROOT}/crud/shipment-planner`,
          element: (
            <ShipmentPlannerProvier>
              <ShipmentPlanner />
            </ShipmentPlannerProvier>
          ),
          errorElement: <ErrorPage />,
          children: [
            {
              path: `${MODULE_APPS_ROOT}/crud/shipment-planner/`,
              element: <ShipmentPlannerPanel />,
              errorElement: <ErrorPage />,
            },
          ],
        },
        {
          path: `${MODULE_APPS_ROOT}/shipments`,
          element: <Shipments />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: `${MODULE_APPS_ROOT}/shipments/`,
              element: <ShipmentsPanel />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/shipments/shipmentStatusDetail`,
              element: <ShipmentStatusDetail />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/shipments/shipmentStatusDetail/productsDetail`,
              element: <ShipmentProductsDetail />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/shipments/shipmentStatusDetail/shipmentDetail`,
              element: <ShipmentDetail />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/shipments/shipmentStatusDetail/shipmentDetail/documentDetail`,
              element: <DocumentDetail />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/shipments/shipmentStatusDetail/logistics`,
              element: <Logistic />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppsModules;
