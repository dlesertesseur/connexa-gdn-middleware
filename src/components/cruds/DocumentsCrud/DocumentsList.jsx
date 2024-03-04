/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../utils/hooks";
import { Stack } from "@mantine/core";
import { HEADER_HIGHT } from "../../../data/config";
import { useEffect } from "react";
import { useDocumentsCrudContext } from "../../../context/DocumentsCrudContext";
import { useNavigate } from "react-router-dom";
import DataTable from "../../ui/DataTable";
import Toolbar from "./Toolbar";

const DocumentsList = () => {
  const { t } = useTranslation();
  //const [opened, { open, close }] = useDisclosure(false);
  //const [confirmation, setConfirmation] = useState(false);
  const wSize = useWindowSize();
  const navigate = useNavigate();

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
  } = useDocumentsCrudContext();

  let col = 0;
  const cols = t("crud.documents.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "agente", align: "left", width: 300 },
    { label: cols[col++], field: "proveedor", align: "left", width: 350 },
    { label: cols[col++], field: "tipo", align: "left", width: 150 },
    { label: cols[col++], field: "referencia", align: "left", width: 100 },
    { label: cols[col++], field: "fecha", align: "center", width: 100, type: "timestampToYYYYMMDD" },
    { label: cols[col++], field: "incoterm", align: "left", width: 100 },
    { label: cols[col++], field: "moneda", align: "left", width: 100 },
    { label: cols[col++], field: "valor", align: "right", width: 100, type: "strToFloat", format: "es-ES" },
    { label: cols[col++], field: "fob", align: "right", width: 100 },
    { label: cols[col++], field: "codigoDeProveedor", align: "left", width: 200 },
    // { label: cols[col++], field: "estado", align: "left", width: 250 },
    { label: cols[col++], field: "embarques", align: "right", width: 100 },
    { label: cols[col++], field: "analista", align: "left", width: 300 },
    //{ label: cols[col++], field: "documentBuyer", align: "left", width: 300 },
  ];

  useEffect(() => {
    getAll();
  }, [reload]);

  // const save = async (buyerId) => {
  //   await assignBuyerToDocument(buyerId);
  //   close();
  //   reloadData();
  // };

  // const unassignBuyer = async () => {
  //   await unassignBuyerToDocument();
  //   setConfirmation(false);
  //   reloadData();
  // };

  function onViewDetail(id) {
    const doc = documents.find((d) => d.id === id);

    if (doc) {
      const params = {
        state: {
          reference: doc.referencia,
          accessSidom: false,
        },
        options: { replace: true },
      };
      navigate("documentDetail", params);
    }
  }

  return (
    <Stack gap={"xs"}>
      {/* <AsignBuyerModal opened={opened} onCancel={close} onAccept={save} /> */}
      {/* <ModalConfirmation
        opened={confirmation}
        text={t("crud.documents.unassigned")}
        onAccept={() => {
          unassignBuyer();
        }}
        onCancel={() => {
          setConfirmation(null);
        }}
      /> */}
      <Toolbar
        title={t("crud.documents.title")}
        rowSelected={selectedRowId}
        buyer={hasBuyer(selectedRowId)}
        open={open}
        onViewDetail={onViewDetail}
        exportData={true}
        data={documents}
        columns={columns}
        fileName={"documents"}
        sheetName={"documents"}
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
