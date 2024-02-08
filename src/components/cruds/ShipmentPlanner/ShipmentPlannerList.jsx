/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import { HEADER_HIGHT } from "../../../data/config";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconCalendarMonth } from "@tabler/icons-react";
import DataTable from "../../ui/DataTable";
import ModalNotification from "../../ui/ModalNotification";
import Toolbar from "./Toolbar";
import ModalConfirmation from "../../ui/ModalConfirmation";

const ShipmentPlannerList = () => {
  const { t } = useTranslation();
  const { height } = useViewportSize();
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [filtredData, setFiltredData] = useState([]);

  let col = 0;
  const cols = t("crud.shipmentPlanner.columns", { returnObjects: true });

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
    hasPlan,
    removePlan,
    reload,
    shipmentPlanYears,
    yearSelected,
    setYearSelected,
    shipmentPlanByYear,
  } = useShipmentPlannerContext();

  useEffect(() => {
    if (shipmentPlanYears && shipmentPlanYears.length > 0 && yearSelected == null) {
      setYearSelected(shipmentPlanYears[0]);
    }
  }, [shipmentPlanYears]);

  useEffect(() => {
    if (yearSelected) {
      const data = shipmentPlanByYear.get(yearSelected);
      setFiltredData(data);
    }
  }, [yearSelected, shipmentPlanByYear]);

  const columns = [
    { label: "", field: "hasPlan", type: "icon", width: 30, iconOn: <IconCalendarMonth size={16} />, iconOff: null },
    { label: cols[col++], field: "referencia", align: "left", width: 120 },
    { label: cols[col++], field: "producto", align: "left", width: 200 },
    { label: cols[col++], field: "analista", align: "left", width: 200 },
    { label: cols[col++], field: "evento", align: "left", width: 200 },
    { label: cols[col++], field: "estado", align: "left", width: 200 },
    { label: cols[col++], field: "necesidadEnCd", align: "center", width: 160 },
    { label: cols[col++], field: "proveedor", align: "left", width: 300 },
    { label: cols[col++], field: "paisOrigen", align: "left", width: 200 },
    {
      label: cols[col++],
      field: "valorDeEmbarque",
      align: "right",
      width: 150,
      default: 0,
      type: "strToFloat",
      format: "es-ES",
    },
    {
      label: cols[col++],
      field: "valorDeLaOrdenDeCompra",
      align: "right",
      width: 150,
      default: 0,
      type: "strToFloat",
      format: "es-ES",
    },
    { label: cols[col++], field: "moneda", align: "center", width: 100, default: "---" },
    { label: cols[col++], field: "incoterm", align: "left", width: 100 },
    { label: cols[col++], field: "feus", align: "right", width: 100 },
    { label: cols[col++], field: "canal", align: "centerleft", width: 100 },
  ];

  const onRowClick = (id) => {
    if (id) {
      setSelectedShipmentId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const deleteRow = async () => {
    setRemoving(true);
    setConfirmation(null);
    try {
      await removePlan();
    } catch (error) {
      setError(error);
    } finally {
      setRemoving(false);
    }
    reload();
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

      <ModalConfirmation
        opened={confirmation}
        text={t("general.message.deleteRow")}
        onAccept={() => {
          deleteRow();
        }}
        onCancel={() => {
          setConfirmation(null);
        }}
      />

      <Toolbar
        title={t("crud.shipmentPlanner.title")}
        rowSelected={selectedShipmentId}
        hasPlan={hasPlan()}
        onDelete={() => setConfirmation(true)}
      />
      <DataTable
        data={filtredData}
        columns={columns}
        h={height - HEADER_HIGHT}
        setSelectedRowId={onRowClick}
        selectedRowId={selectedShipmentId}
        loading={loading || removing}
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
