/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../utils/hooks";
import { Stack } from "@mantine/core";
import { HEADER_HIGHT, MODULE_APPS_ROOT } from "../../../data/config";
import { useEffect } from "react";
import { useEventCrudContext } from "../../../context/EventCrudContext";
import CrudToolbar from "../CrudToolbar";
import DataTable from "../../ui/DataTable";

const EventList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wSize = useWindowSize();

  const {
    getAll,
    events,
    loading,
    reload,
    selectedRowId,
    setSelectedRowId,
    selectedColumnId,
    setSelectedColumnId,
    sortOrder,
    setSortOrder
  } = useEventCrudContext();

  let col = 0;
  const cols = t("crud.events.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "name", align: "left", width: "25%" },
    { label: cols[col++], field: "description", align: "left", width: "30%" },
    { label: cols[col++], field: "sidomkeys", align: "left", width: "25%" },
    { label: cols[col++], field: "startDateTime", align: "center", width: "10%", type: "timestampToYYYYMMDD" },
    { label: cols[col++], field: "endDateTime", align: "center", width: "10%", type: "timestampToYYYYMMDD" },
  ];

  useEffect(() => {
    getAll();
  }, [reload]);

  return (
    <Stack gap={"xs"}>
      <CrudToolbar
        title={t("crud.events.title")}
        rowSelected={selectedRowId}
        onBack={() => {
          navigate(`${MODULE_APPS_ROOT}`);
        }}
        onCreate={() => {
          navigate("create");
        }}
        onUpdate={() => {
          navigate("update");
        }}
        onDelete={() => {
          navigate("delete");
        }}
      />
      <DataTable
        data={events}
        columns={columns}
        headerHeight={36}
        h={wSize.height - HEADER_HIGHT}
        setSelectedRowId={setSelectedRowId}
        selectedRowId={selectedRowId}
        loading={loading}
        selectedColumnId={selectedColumnId}
        sortOrder={sortOrder}
        setSelectedColumnId={setSelectedColumnId}
        setSortOrder={setSortOrder}
        columnsByPercentage={true}
      />
    </Stack>
  );
};

export default EventList;
