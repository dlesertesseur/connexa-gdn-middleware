/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useEffect } from "react";
import { useUserCrudContext } from "../../../context/UserCrudContext";
import { useWindowSize } from "../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { HEADER_HIGHT } from "../../../data/config";
import DataTable from "../../ui/DataTable";
import CrudToolbar from "../CrudToolbar";

const UserList = () => {
  const {
    getAll,
    users,
    loading,
    reload,
    selectedUserId,
    setSelectedUserId,
    selectedColumnId,
    setSelectedColumnId,
    sortOrder,
    setSortOrder,
  } = useUserCrudContext();
  const { t } = useTranslation();
  const wSize = useWindowSize();

  let col = 0;
  const cols = t("crud.users.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "lastname", align: "left", width: "25%" },
    { label: cols[col++], field: "firstname", align: "left", width: "30%" },
    { label: cols[col++], field: "username", align: "left", width: "20%" },
    { label: cols[col++], field: "sidomkey", align: "left", width: "25%" },
  ];

  useEffect(() => {
    getAll();
  }, [reload]);

  return (
    <Stack gap={"xs"}>
      <CrudToolbar title={t("crud.users.title")} rowSelected={selectedUserId} />
      <DataTable
        data={users}
        columns={columns}
        headerHeight={36}
        h={wSize.height - HEADER_HIGHT}
        setSelectedRowId={setSelectedUserId}
        selectedRowId={selectedUserId}
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

export default UserList;
