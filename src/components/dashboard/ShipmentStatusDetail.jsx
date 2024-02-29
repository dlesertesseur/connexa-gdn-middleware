/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { getEventById } from "../../data/events";
import DataTable from "../ui/DataTable";
import EventTimeline from "../ui/EventTimeline";


const rowHeight = 100;
const planHeight = 146;

const ShipmentStatusDetail = ({ data = [], height, shipmentMap, advantageColor }) => {
  const { t } = useTranslation();

  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [selectedShipmentPlan, setSelectedShipmentPlan] = useState(null);
  const [startDateTimeRange, setStartDateTimeRange] = useState(null);
  const [endDateTimeRange, setEndDateTimeRange] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [layers, setLayers] = useState(null);

  const {user} = useUserContext();

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map((m) => m.name);

  let col = 0;
  const cols = t("shipments.columns", { returnObjects: true });

  const columns = [
    { label: "", field: "led", type: "led", width: 30 },
    { label: cols[col++], field: "referencia", align: "left", width: 150 },
    { label: cols[col++], field: "producto", align: "left", width: 200 },
    { label: cols[col++], field: "analista", align: "left", width: 200 },
    { label: cols[col++], field: "evento", align: "left", width: 200 },
    { label: cols[col++], field: "paisOrigen", align: "left", width: 200 },
    {
      label: cols[col++],
      field: "valorDelEmbarque",
      align: "right",
      width: 150,
      default: 0,
      type: "strToFloat",
      format: "es-ES",
    },
    {
      label: cols[col++],
      field: "valorDeLaOrdenDeCompra",
      align: "right",
      width: 150,
      default: 0,
      type: "strToFloat",
      format: "es-ES",
    },
    { label: cols[col++], field: "moneda", align: "center", width: 200, default: "---" },
    { label: cols[col++], field: "incoterm", align: "left", width: 200 },
    { label: cols[col++], field: "feus", align: "right", width: 200 },
    { label: cols[col++], field: "proveedor", align: "left", width: 200 },
    { label: cols[col++], field: "necesidadEnCd", align: "center", width: 160 },
    { label: cols[col++], field: "division", align: "left", width: 160 },
    { label: cols[col++], field: "departamento", align: "left", width: 160 },
    { label: cols[col++], field: "canal", align: "left", width: 160 },
  ];

  function createPart(id, name, color, startDate, endDate, durationInDays, percentage) {
    const ret = {
      id: id,
      name: name,
      color: color,
      startDateTime: startDate,
      endDateTime: endDate,
      percentage: percentage,
      durationInDays: durationInDays,
    };

    return ret;
  }

  function createPartsFromPlan(p) {
    const ret = {
      label: p.shipment.documentId,
      //name: p.shipment.producto,
      values: [
        { label: "Producto", value: p.shipment.producto },
        { label: "Embarque", value: p.shipment.referencia },
        { label: "Analista", value: p.shipment.analista },
        { label: "Estado", value: p.shipment.estado },
        { label: "Valor", value: p.shipment.valorDelEmbarque },
      ],
      id: p.shipment.id,
      parts: [
        createPart(
          "preparation",
          t("sprints.preparation.label"),
          t("sprints.preparation.color"),
          p.shipmentPlan.preparationStart,
          p.shipmentPlan.preparationEnd,
          p.shipmentPlan.preparationDurationInDays,
          p.shipmentPlan.preparationPercentage
        ),
        createPart(
          "shipping",
          t("sprints.shipping.label"),
          t("sprints.shipping.color"),
          p.shipmentPlan.shippingStart,
          p.shipmentPlan.shippingEnd,
          p.shipmentPlan.shippingDurationInDays,
          p.shipmentPlan.shippingPercentage
        ),
        createPart(
          "reception",
          t("sprints.reception.label"),
          t("sprints.reception.color"),
          p.shipmentPlan.receptionStart,
          p.shipmentPlan.receptionEnd,
          p.shipmentPlan.receptionDurationInDays,
          p.shipmentPlan.receptionPercentage
        ),
        createPart(
          "distribution",
          t("sprints.distribution.label"),
          t("sprints.distribution.color"),
          p.shipmentPlan.distributionStart,
          p.shipmentPlan.distributionEnd,
          p.shipmentPlan.distributionDurationInDays,
          p.shipmentPlan.distributionPercentage
        ),
        createPart(
          "sales",
          t("sprints.sales.label"),
          t("sprints.sales.color"),
          p.shipmentPlan.salesStart,
          p.shipmentPlan.salesEnd,
          p.shipmentPlan.salesDurationInDays,
          p.shipmentPlan.salesPercentage
        ),
      ],
    };
    return ret;
  }

  useEffect(() => {
    let ret = null;
    if (selectedShipmentId) {
      ret = shipmentMap.get(selectedShipmentId);

      if (ret) {
        const start = new Date(ret.shipmentPlan.preparationStart);
        const end = new Date(ret.shipmentPlan.salesEnd);

        setStartDateTimeRange(start.getFullYear());
        setEndDateTimeRange(end.getFullYear());

        const plan = createPartsFromPlan(ret);
        setSelectedShipmentPlan([plan]);
        setEventId(ret.shipmentPlan.eventId);
      }
    }
  }, [selectedShipmentId]);

  const getData = async (id) => {
    let event = null;
    const layers=[];
    try {
      const params = { token: user.token, id: id };
      event = await getEventById(params);
      if (event) {
        const ret = {
          id: event.id,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          color: "rgba( 255, 0, 0, 0.2 )",
          name: event.name,
          h: rowHeight,
          border:true
        };
        layers.push(ret);
      }

      const date = new Date();
      const actualDate = {
        id: "actual-day",
        startDateTime: date,
        endDateTime: date,
        color: "rgba( 0, 0, 0, 0.6 )",
        name: "actualDay",
        h: rowHeight,
        border: false
      };

      layers.push(actualDate);
      setLayers(layers);

    } catch (error) {
      console.log(error);
    }

    return event;
  };

  useEffect(() => {
    if (eventId) {
      getData(eventId);
    }
  }, [eventId]);

  const onRowClick = (id) => {
    if (id) {
      setSelectedShipmentId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <Stack gap={4}>
      <DataTable
        data={data}
        columns={columns}
        h={height - planHeight}
        setSelectedRowId={onRowClick}
        selectedRowId={selectedShipmentId}
        selectedColumnId={selectedColumnId}
        setSelectedColumnId={setSelectedColumnId}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        columnsByPercentage={false}
      />

      {selectedShipmentPlan ? (
        <EventTimeline
          startYear={startDateTimeRange}
          endYear={endDateTimeRange}
          data={selectedShipmentPlan}
          h={planHeight}
          monthLabels={monthLabels}
          rowHeight={rowHeight}
          layers={layers}
          minItemWidth={250}
          advantageColor={advantageColor}
        />
      ) : (
        <Group h={planHeight} justify="center" align="center">
          <Text c="dimmed">{t("label.unselectedShipment")}</Text>
        </Group>
      )}
    </Stack>
  );
};

export default ShipmentStatusDetail;
