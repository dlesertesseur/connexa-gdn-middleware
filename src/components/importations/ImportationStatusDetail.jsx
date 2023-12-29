import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HEADER_HIGHT } from "../../data/config";
import { useImportationContext } from "../../context/ImportationContext";
import { useWindowSize } from "../../utils/hooks";
import ImportationStatusDetailToolbar from "./ImportationStatusDetailToolbar";
import DataTable from "../DataTable";

const ImportationStatusDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wSize = useWindowSize();

  let col = 0;
  const cols = t("importations.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "referencia", align: "left", width: 150},
    { label: cols[col++], field: "shpProducto", align: "left", width: 200 },
    { label: cols[col++], field: "shpAnalista", align: "left", width: 200 },
    { label: cols[col++], field: "shpEvento", align: "left", width: 200 },
    { label: cols[col++], field: "shpPaisOrigen", align: "left", width: 200 },
    { label: cols[col++], field: "docValor", align: "right", width: 200 },
    { label: cols[col++], field: "docMoneda", align: "center", width: 200 },
    { label: cols[col++], field: "docIncoterm", align: "left", width: 200 },
    { label: cols[col++], field: "docFob", align: "right", width: 200, type: "strToFloat" },
    { label: cols[col++], field: "shpFeus", align: "right", width: 200 },
    { label: cols[col++], field: "shpProveedor", align: "left", width: 200 },
    { label: cols[col++], field: "docFecha", align: "center", width: 200,  type: "timestampToYYYYMMDD" },
    { label: cols[col++], field: "shpNecesidadEnCd", align: "center", width: 160 },
  ];

  const {
    importationsByStatus,
    statusSelected,
    loading,
    selectedImportationId,
    setSelectedImportationId,
    scrollYPos,
    setScrollYPos,
  } = useImportationContext();

  const onRowClick = (id) => {
    if (id) {
      const found = importationsByStatus.find((r) => r.id === id);
      const params = {
        state: {
          reference: found.referencia,
          product: found.shpProducto,
        },
        options: { replace: true },
      };
      navigate("productsDetail", params);
      setSelectedImportationId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const activeMap = (status) => {
    let ret = status.split(" ");
    ret = ret[0];
    ret = parseInt(ret);
    if(ret === 5 ){
      return(true);
    }
    else{
      return(false);
    }
  }

  return (
    <Stack spacing={"xs"}>
      <ImportationStatusDetailToolbar
        title={statusSelected}
        activeMap={activeMap(statusSelected)}
        back={() => {
          navigate("../");
        }}
      />
      <DataTable
        data={importationsByStatus}
        columns={columns}
        h={wSize.height - HEADER_HIGHT}
        setSelectedRowId={onRowClick}
        selectedRowId={selectedImportationId}
        loading={loading}
        setScrollYPos={setScrollYPos}
        scrollYPos={scrollYPos}
      />
    </Stack>
  );
};

export default ImportationStatusDetail;
