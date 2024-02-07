import { Alert, Group, ScrollArea, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import { useShipmentContext } from "../../context/ShipmentContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { findAsociateShipmentsByDocument, findDocumentByReference, findItemsByDocument } from "../../data/documents";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import { BASE_IMAGE_URl, getSidomShipmentUrl } from "../../data/config";
import DocumentDetailToolbar from "./DocumentDetailToolbar";
import ShipmentProductDetailDialog from "./ShipmentProductDetailDialog";
import SimpleTable from "../ui/SimpleTable/SimpleTable";

const DocumentDetail = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { height } = useViewportSize();
  const { statusSelected } = useShipmentContext();
  const { user } = useUserContext();
  const { reference, accessSidom } = location.state;

  const [values, setValues] = useState(null);
  const [items, setItems] = useState(null);
  const [shipments, setShipments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fields = t("document.detail.fields", { returnObjects: true });

  let col = 0;
  let cols = t("document.items.columns", { returnObjects: true });

  const onImageClick = (item) => {
    if (item.id) {
      const product = items.find((r) => r.id === item.id);
      if (product) {
        setSelectedProduct(product);
      }
    }
  };

  const onLink = (item) => {

    const url = getSidomShipmentUrl(item.interno, item.referencia, item.destinacion);
    const win = window.open(url, '_blank');

    console.log("onLink -> ", url);

    win.focus();
  };

  const itemsColumns = [
    { label: cols[col++], field: "image", align: "center", width: 100, type: "image", onClick: onImageClick },
    { label: cols[col++], field: "codigo", align: "right", width: 140 },
    { label: cols[col++], field: "descripcion", align: "left", width: 300 },
    { label: cols[col++], field: "upc", align: "right", width: 150 },
    { label: cols[col++], field: "fob", align: "right", width: 140 },
    { label: cols[col++], field: "unidad", align: "left", width: 140 },
    { label: cols[col++], field: "cantidad", align: "right", width: 140 },
    { label: cols[col++], field: "valor", align: "right", width: 140 },
    { label: cols[col++], field: "timestamp", align: "center", type: "timestampToYYYYMMDD" },
  ];

  cols = t("document.shipments.columns", { returnObjects: true });
  col = 0;
  const shipmentColumns = [
    { label: cols[col++], field: "referencia", align: "left", width: 150, type: !accessSidom ? "link" : null, onClick: onLink },
    { label: cols[col++], field: "producto", align: "left", width: 200 },
    { label: cols[col++], field: "analista", align: "left", width: 200 },
    { label: cols[col++], field: "evento", align: "left", width: 200 },
    { label: cols[col++], field: "paisOrigen", align: "left", width: 200 },
    { label: cols[col++], field: "valor", align: "right", width: 200, default: 0 },
    { label: cols[col++], field: "moneda", align: "center", width: 200, default: "---" },
    { label: cols[col++], field: "incoterm", align: "left", width: 200 },
    { label: cols[col++], field: "feus", align: "right", width: 200 },
    { label: cols[col++], field: "proveedor", align: "left", width: 200 },
    { label: cols[col++], field: "necesidadEnCd", align: "center", width: 160 },
    { label: cols[col++], field: "estado", align: "left", width: 160 },
  ];

  const getData = async () => {
    const params = {
      token: user.token,
      reference: reference,
    };

    setLoading(true);
    try {
      const data = await findDocumentByReference(params);

      if (data.message) {
        setError(data.message);
      } else {
        const values = fields.map((e) => {
          const ret = { label: t(`document.detail.label.${e}`), value: data[e] };
          return ret;
        });
        setValues(values);
      }

      const items = await findItemsByDocument(params);
      if (items.message) {
        setError(items.message);
      } else {
        const rows = items.map((p) => {
          const ret = { ...p };
          ret.image = `${BASE_IMAGE_URl}/resources/gdnar_images/${p.upc}.jpg`;
          return ret;
        });
        setItems(rows);
      }

      const shipments = await findAsociateShipmentsByDocument(params);
      if (shipments.message) {
        setError(shipments.message);
      } else {
        setShipments(shipments);
      }
    } catch (error) {
      setError(t(`document.error.documentNotFound`));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (reference) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  // useEffect(() => {
  //   if (rowSelected) {
  //     const product = items.find((r) => r.id === rowSelected);
  //     if (product) {
  //       setSelectedProduct(product);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rowSelected]);

  return (
    <Stack gap={"xs"}>
      <DocumentDetailToolbar
        disabled={loading}
        statusSelected={statusSelected}
        reference={reference}
        accessSidom={accessSidom}
      />
      {error ? (
        <Group justify="center">
          <Alert
            miw={300}
            maw={400}
            variant="light"
            color="red"
            withCloseButton
            title={t("general.title.error")}
            icon={<IconAlertOctagonFilled size={24} />}
          >
            <Text size="sm" c={"red"}>
              {error}
            </Text>
          </Alert>
        </Group>
      ) : (
        <ScrollArea mt={"xs"} h={height - 170} offsetScrollbars>
          <Title order={4} mb={"sm"}>
            {t("document.title")}
          </Title>
          <Group gap={0}>
            {values ? (
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Tbody>
                  {values?.map((v) => {
                    const ret = (
                      <Table.Tr key={v.label}>
                        <Table.Td w={250}>{v.label}</Table.Td>
                        <Table.Td>{v.value}</Table.Td>
                      </Table.Tr>
                    );
                    return ret;
                  })}
                </Table.Tbody>
              </Table>
            ) : (
              <Skeleton height={64} radius={"md"} />
            )}
          </Group>

          <Title mt={"xl"} mb={"md"} order={4}>
            {t("document.itemTitle")}
          </Title>
          {items ? (
            <Group>
              <SimpleTable data={items} columns={itemsColumns} />
            </Group>
          ) : (
            <Skeleton height={64} radius={"md"} />
          )}

          <Title mt={"xl"} mb={"md"} order={4}>
            {t("document.shipmentsTitle")}
          </Title>
          {shipments ? (
            <Group>
              <SimpleTable data={shipments} columns={shipmentColumns} />
            </Group>
          ) : (
            <Skeleton height={64} radius={"md"} />
          )}
        </ScrollArea>
      )}
      <ShipmentProductDetailDialog
        title={""}
        open={selectedProduct}
        setOpen={setSelectedProduct}
        product={selectedProduct}
      />
    </Stack>
  );
};

export default DocumentDetail;
