/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../utils/hooks";
import { Stack } from "@mantine/core";
import { HEADER_HIGHT } from "../../../data/config";
import { useEffect } from "react";

import DataTable from "../../ui/DataTable";
import { useBuyerCrudContext } from "../../../context/BuyerCrudContext";
import CrudToolbar from "./CrudToolbar";

const BuyerList = ({setActiveComponent}) => {
  const { t } = useTranslation();

  const wSize = useWindowSize();

  const {
    getAll,
    buyers,
    loading,
    reload,
    selectedRowId,
    setSelectedRowId,
    selectedColumnId,
    setSelectedColumnId,
    sortOrder,
    setSortOrder,
  } = useBuyerCrudContext();

  let col = 0;
  const cols = t("crud.buyers.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "firstname", align: "left", width: "40%" },
    { label: cols[col++], field: "lastname", align: "left", width: "60%" },
  ];

  useEffect(() => {
    getAll();
  }, [reload]);

  return (
    <Stack gap={"xs"}>
      <CrudToolbar rowSelected={selectedRowId} setActiveComponent={setActiveComponent}/>
      <DataTable
        data={buyers}
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

export default BuyerList;
