import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_IMAGE_URl, HEADER_HIGHT } from "../../data/config";
import { findImportationsItemsByReference } from "../../data/Importations";
import { useUserContext } from "../../context/UserContext";
import { useWindowSize } from "../../utils/hooks";
import { useShipmentContext } from "../../context/ShipmentContext";
import DataTable from "../ui/DataTable";
import ShipmentProductsDetailToolbar from "./ShipmentProductsDetailToolbar";
import ShipmentProductDetailDialog from "./ShipmentProductDetailDialog";

const ShipmentProductsDetail = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { setError, statusSelected } = useShipmentContext();
  const { reference } = location.state;

  const wSize = useWindowSize();

  let col = 0;
  const cols = t("importations.items.columns", { returnObjects: true });

  const onImageClick = (item) => {

    if (item.id) {
      const product = rows.find((r) => r.id === item.id);
      if (product) {
        setSelectedProduct(product);
      }
    }
  };

  const columns = [
    { label: cols[col++], field: "image", align: "center", width: 100, type: "image", onClick: onImageClick },
    { label: cols[col++], field: "codigo", align: "right", width: 140 },
    { label: cols[col++], field: "descripcion", align: "left", width: 300 },
    { label: cols[col++], field: "upc", align: "right", width: 150 },
    { label: cols[col++], field: "fob", align: "right", width: 140, type: "money" },
    { label: cols[col++], field: "unidad", align: "left", width: 140 },
    { label: cols[col++], field: "cantidad", align: "right", width: 140 },
    { label: cols[col++], field: "valor", align: "right", width: 140 },
    { label: cols[col++], field: "timestamp", align: "center", type: "timestampToYYYYMMDD" },
  ];

  const getData = async () => {
    const params = {
      token: user.token,
      reference: reference,
    };

    try {
      setLoading(true);
      const list = await findImportationsItemsByReference(params);
      setLoading(false);

      if (list.message) {
        setError(list.message);
      } else {
        const rows = list.map((p) => {
          const ret = { ...p };
          ret.image = `${BASE_IMAGE_URl}/resources/gdnar_images/${p.upc}.jpg`;
          return ret;
        });
        setRows(rows);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (reference) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  useEffect(() => {
    if (rowSelected) {
      const product = rows.find((r) => r.id === rowSelected);
      if (product) {
        setSelectedProduct(product);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected]);

  return (
    <>
      <Stack gap={"xs"}>
        <ShipmentProductsDetailToolbar
          statusSelected={statusSelected}
          reference={reference}
          back={() => {
            navigate(-1);
          }}
        />
        <DataTable
          data={rows}
          columns={columns}
          headerHeight={36}
          h={(wSize.height - HEADER_HIGHT)}
          setSelectedRowId={setRowSelected}
          selectedRowId={rowSelected}
          loading={loading}
        />

        <ShipmentProductDetailDialog
          title={""}
          open={selectedProduct}
          setOpen={setSelectedProduct}
          product={selectedProduct}
        />
      </Stack>
    </>
  );
};

export default ShipmentProductsDetail;
