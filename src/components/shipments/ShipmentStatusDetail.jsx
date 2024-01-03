import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HEADER_HIGHT } from "../../data/config";
import { useShipmentContext } from "../../context/ShipmentContext";
import { useWindowSize } from "../../utils/hooks";
import DataTable from "../DataTable";
import ShipmentStatusDetailToolbar from "./ShipmentStatusDetailToolbar";

const ShipmentStatusDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wSize = useWindowSize();

  let col = 0;
  const cols = t("shipments.columns", { returnObjects: true });

  const columns = [
    { label: cols[col++], field: "referencia", align: "left", width: 150},
    { label: cols[col++], field: "producto", align: "left", width: 200 },
    { label: cols[col++], field: "analista", align: "left", width: 200 },
    { label: cols[col++], field: "evento", align: "left", width: 200 },
    { label: cols[col++], field: "paisOrigen", align: "left", width: 200 },
    { label: cols[col++], field: "valor", align: "right", width: 200, default:0 },
    { label: cols[col++], field: "moneda", align: "center", width: 200, default:"---" },
    { label: cols[col++], field: "incoterm", align: "left", width: 200 },
    { label: cols[col++], field: "feus", align: "right", width: 200 },
    { label: cols[col++], field: "proveedor", align: "left", width: 200 },
    { label: cols[col++], field: "mecesidadEnCd", align: "center", width: 160 },
    { label: cols[col++], field: "channel", align: "centerleft", width: 160 },
  ];

  const {
    importationsByStatus,
    statusSelected,
    loading,
    selectedShipmentId,
    setSelectedShipmentId,
    scrollYPos,
    setScrollYPos,
  } = useShipmentContext();

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
      setSelectedShipmentId(id);
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
      <ShipmentStatusDetailToolbar
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
        selectedRowId={selectedShipmentId}
        loading={loading}
        setScrollYPos={setScrollYPos}
        scrollYPos={scrollYPos}
      />
    </Stack>
  );
};

export default ShipmentStatusDetail;
