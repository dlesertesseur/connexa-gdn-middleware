/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Center, Group, Loader, Modal, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMasterPlanContext } from "../../context/MasterPlanContext";
import { useViewportSize } from "@mantine/hooks";
import EventTimeline from "../ui/EventTimeline";

const InspectEventModal = ({ opened, close, event }) => {
  const { t } = useTranslation();
  const { getShipmentsPlanByEvent } = useMasterPlanContext();
  const {height} = useViewportSize();
  
  const [layers, setLayers] = useState(null);
  const [plans, setPlans] = useState(null);
  const [startDateTimeRange, setStartDateTimeRange] = useState(null);
  const [endDateTimeRange, setEndDateTimeRange] = useState(null);
  
  const rowHeight = 100;
  const totalHeight = height - 150;//rowHeight * 6;

  async function getData(event) {
    if (event) {
      const plans = await getShipmentsPlanByEvent(event.id);
      if (plans) {

        const maxMin = plans.reduce((acc, plan) => {
          acc[0] = acc[0] === undefined || plan.shipmentPlan.preparationStart < acc[0] ? plan.shipmentPlan.preparationStart : acc[0];
          acc[1] = acc[1] === undefined || plan.shipmentPlan.salesEnd > acc[1] ? plan.shipmentPlan.salesEnd : acc[1];
          return acc;
        }, []);

        const start = new Date(maxMin[0]);
        const end = new Date(maxMin[1]);

        setStartDateTimeRange(start.getFullYear());
        setEndDateTimeRange(end.getFullYear());

        const plansWithParts = createPartsFromPlansData(plans);
        setPlans(plansWithParts);
      }

      createLayers(event);
    }
  }

  const createLayers = (event) => {
    let layers = [];

    if (event) {
      const ret = {
        id: "event",
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
        color: "rgba( 255, 0, 0, 0.2 )",
        name: event.name,
        h: totalHeight,
        border:true,
        borderColor:"#ff0000",
        borderWidth:3
      };
      layers.push(ret);

      const date = new Date();
      const actualDate = {
        id: "actual-day",
        startDateTime: date,
        endDateTime: date,
        color: "rgba( 0, 0, 0, 0.2 )",
        name: "actualDay",
        h: totalHeight,
      };
      layers.push(actualDate);
    }
    setLayers(layers);
  };

  function createPartsFromPlansData(plans) {
    const ret = plans.map((p) => createPartsFromPlan(p));
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

  useEffect(() => {
    if (event && height > 0) {
      getData(event);
    }
  }, [event, height]);

  const months = t("months", { returnObjects: true });
  const monthLabels = months.map((m) => m.name);

  return (
    <Modal.Root opened={opened} onClose={close} size={"100%"} centered fullScreen>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{event?.name}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack justify="space-between">
            <Group gap={0} wrap="nowrap">
              <Title size={"h5"} mb={"xs"}>
                {event?.description}
              </Title>
            </Group>
            {plans && layers && totalHeight > 0? (
              <Group gap={0} grow>
                <EventTimeline
                  startYear={startDateTimeRange}
                  endYear={endDateTimeRange}
                  data={plans}
                  h={totalHeight}
                  monthLabels={monthLabels}
                  rowHeight={rowHeight}
                  layers={layers}
                  minItemWidth={250}
                />
              </Group>
            ) : (
              <Center h={totalHeight} w={"100%"}>
                <Loader />
              </Center>
            )}
            {/* <Group justify="flex-end" mt={"md"}>
              <Button
                onClick={() => {
                  close();
                }}
              >
                {t("general.button.close")}
              </Button>
            </Group> */}
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default InspectEventModal;
