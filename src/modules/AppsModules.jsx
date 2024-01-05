import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MODULE_APPS_ROOT } from "../data/config";
import ErrorPage from "./ErrorPage";
import AppFrame from "../components/AppFrame";
import ProtectRoute from "../components/ProtectRoute";
import Importations from "../components/importations/Importations";
import ImportationsPanel from "../components/importations/ImportationsPanel";
import ImportationStatusDetail from "../components/importations/ImportationStatusDetail";
import ImportationProductsDetail from "../components/importations/ImportationProductsDetail";
import Dashboard from "../components/dashboard/Dashboard";
import DashboardProvier from "../context/DashboardContext";
import Logistic from "../components/logistic/Logistic";
import Shipments from "../components/shipments/Shipments";
import ShipmentsPanel from "../components/shipments/ShipmentsPanel";
import ShipmentStatusDetail from "../components/shipments/ShipmentStatusDetail";
import ShipmentProductsDetail from "../components/shipments/ShipmentProductsDetail";
import ShipmentDetail from "../components/shipments/ShipmentDetail";
import DocumentDetail from "../components/shipments/DocumentDetail";

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
        //Agregar la pantalla defecto
        // {
        //   path: `${MODULE_APPS_ROOT}/`,
        //   element: <Title>{"PANTALLA DEFECTO"}</Title>,
        //   errorElement: <ErrorPage />,
        // },
        {
          path: `${MODULE_APPS_ROOT}/dashboard`,
          element: (
            <DashboardProvier>
              <Dashboard />
            </DashboardProvier>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: `${MODULE_APPS_ROOT}/importations`,
          element: <Importations />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: `${MODULE_APPS_ROOT}/importations/`,
              element: <ImportationsPanel />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/importations/importationStatusDetail`,
              element: <ImportationStatusDetail />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/importations/importationStatusDetail/productsDetail`,
              element: <ImportationProductsDetail />,
              errorElement: <ErrorPage />,
            },
            {
              path: `${MODULE_APPS_ROOT}/importations/importationStatusDetail/logistics`,
              element: <Logistic />,
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
