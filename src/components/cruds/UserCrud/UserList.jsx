/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useUserCrudContext } from "../../../context/UserCrudContext";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { HEADER_HIGHT } from "../../../data/config";
import UserCrudToolbar from "./UserCrudToolbar";
import DataTable from "../../DataTable";

const UserList = () => {
  const { getAll, users, loading } = useUserCrudContext();
  const { t } = useTranslation();
  const [rowSelected, setRowSelected] = useState(null);
  const navigate = useNavigate();
  const wSize = useWindowSize();

  let col = 0;
  const cols = t("crud.users.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "lastname", align: "left", width: 300 },
    { label: cols[col++], field: "firstname", align: "left", width: 300 },
    { label: cols[col++], field: "username", align: "left", width: 300 },
    { label: cols[col++], field: "sidomkey", align: "left" },
  ];

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Stack gap={"xs"}>
      <UserCrudToolbar
        title={t("crud.users.title")}
        rowSelected={rowSelected}
        onBack={() => {navigate(-1);}}
        onCreate={() => {navigate("create");}}
        onUpdate={() => {navigate("update");}}
        onDelete={() => {navigate("delete");}}
      />
      <DataTable
        data={users}
        columns={columns}
        headerHeight={36}
        h={wSize.height - HEADER_HIGHT}
        setSelectedRowId={setRowSelected}
        selectedRowId={rowSelected}
        loading={loading}
      />
    </Stack>
  );
};

export default UserList;
