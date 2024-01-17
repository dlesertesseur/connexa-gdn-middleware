/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import { HEADER_HIGHT } from "../../../data/config";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { IconCalendarMonth } from "@tabler/icons-react";
import DataTable from "../../ui/DataTable";
import ModalNotification from "../../ui/ModalNotification";
import Toolbar from "./Toolbar";

const ShipmentPlannerList = () => {
  const { t } = useTranslation();
  const { height } = useViewportSize();
  const [error, setError] = useState(null);

  let col = 0;
  const cols = t("crud.shipmentPlanner.columns", { returnObjects: true });

  const columns = [
    { label: "", field: "hasPlan", type: "icon", width: 30, iconOn: <IconCalendarMonth size={16} />, iconOff: null },
    { label: cols[col++], field: "referencia", align: "left", width: 150 },
    { label: cols[col++], field: "producto", align: "left", width: 200 },
    { label: cols[col++], field: "analista", align: "left", width: 200 },
    { label: cols[col++], field: "evento", align: "left", width: 200 },
    { label: cols[col++], field: "paisOrigen", align: "left", width: 200 },
    { label: cols[col++], field: "valor", align: "right", width: 200, default: 0 },
    { label: cols[col++], field: "moneda", align: "center", width: 200, default: "---" },
    { label: cols[col++], field: "incoterm", align: "left", width: 200 },
    { label: cols[col++], field: "feus", align: "right", width: 200 },
    { label: cols[col++], field: "proveedor", align: "left", width: 200 },
    { label: cols[col++], field: "necesidadEnCd", align: "center", width: 160 },
    { label: cols[col++], field: "canal", align: "centerleft", width: 160 },
  ];

  const {
    loading,
    selectedShipmentId,
    setSelectedShipmentId,
    scrollYPos,
    setScrollYPos,
    selectedColumnId,
    setSelectedColumnId,
    sortOrder,
    setSortOrder,
    shipmentPlanBySidomkeys,
    hasPlan,
  } = useShipmentPlannerContext();

  const onRowClick = (id) => {
    if (id) {
      setSelectedShipmentId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <Stack gap={"xs"}>
      <ModalNotification
        opened={error}
        text={error}
        state={"error"}
        onClick={() => {
          setError(null);
        }}
      />

      <Toolbar title={t("crud.shipmentPlanner.title")} rowSelected={selectedShipmentId} hasPlan={hasPlan()} />
      <DataTable
        data={shipmentPlanBySidomkeys}
        columns={columns}
        h={height - HEADER_HIGHT}
        setSelectedRowId={onRowClick}
        selectedRowId={selectedShipmentId}
        loading={loading}
        setScrollYPos={setScrollYPos}
        scrollYPos={scrollYPos}
        selectedColumnId={selectedColumnId}
        sortOrder={sortOrder}
        setSelectedColumnId={setSelectedColumnId}
        setSortOrder={setSortOrder}
      />
    </Stack>
  );
};

export default ShipmentPlannerList;
