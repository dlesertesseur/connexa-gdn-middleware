/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../utils/hooks";
import { Stack } from "@mantine/core";
import { HEADER_HIGHT } from "../../../data/config";
import { useEffect, useState } from "react";
import { useDocumentsCrudContext } from "../../../context/DocumentsCrudContext";
import { useDisclosure } from "@mantine/hooks";
import DataTable from "../../ui/DataTable";
import Toolbar from "./Toolbar";
import AsignBuyerModal from "./AsignBuyerModal";
import ModalConfirmation from "../../ui/ModalConfirmation";

const DocumentsList = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmation, setConfirmation] = useState(false);
  const wSize = useWindowSize();

  const {
    getAll,
    documents,
    loading,
    reload,
    selectedRowId,
    setSelectedRowId,
    selectedColumnId,
    setSelectedColumnId,
    sortOrder,
    setSortOrder,
    hasBuyer,
    assignBuyerToDocument,
    unassignBuyerToDocument,
    reloadData,
  } = useDocumentsCrudContext();

  let col = 0;
  const cols = t("crud.documents.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "agente", align: "left", width: 300 },
    { label: cols[col++], field: "proveedor", align: "left", width: 300 },
    { label: cols[col++], field: "tipo", align: "left", width: 100 },
    { label: cols[col++], field: "referencia", align: "left", width: 100 },
    { label: cols[col++], field: "fecha", align: "left", width: 100 },
    { label: cols[col++], field: "incoterm", align: "left", width: 100 },
    { label: cols[col++], field: "moneda", align: "left", width: 100 },
    { label: cols[col++], field: "valor", align: "left", width: 100 },
    { label: cols[col++], field: "fob", align: "left", width: 100 },
    { label: cols[col++], field: "codigoDeProveedor", align: "left", width: 200 },
    { label: cols[col++], field: "estado", align: "left", width: 100 },
    { label: cols[col++], field: "embarques", align: "left", width: 100 },
    { label: cols[col++], field: "analista", align: "left", width: 300 },
    { label: cols[col++], field: "documentBuyer", align: "left", width: 300 },
  ];

  useEffect(() => {
    getAll();
  }, [reload]);

  const save = async (buyerId) => {
    await assignBuyerToDocument(buyerId);
    close();
    reloadData();
  };

  const unassignBuyer = async (documentBuyerRelationId) => {
    await unassignBuyerToDocument(documentBuyerRelationId);
    setConfirmation(false);
    reloadData();
  };
  return (
    <Stack gap={"xs"}>
      <AsignBuyerModal opened={opened} onCancel={close} onAccept={save} />
      <ModalConfirmation
        opened={confirmation}
        text={t("crud.documents.unassigned")}
        onAccept={() => {
          unassignBuyer();
        }}
        onCancel={() => {
          setConfirmation(null);
        }}
      />
      <Toolbar
        title={t("crud.documents.title")}
        rowSelected={selectedRowId}
        buyer={hasBuyer(selectedRowId)}
        open={open}
        confirm={() => {
          setConfirmation(true);
        }}
      />
      <DataTable
        data={documents}
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
        columnsByPercentage={false}
      />
    </Stack>
  );
};

export default DocumentsList;