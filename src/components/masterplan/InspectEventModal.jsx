/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Center, Group, Loader, Modal, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMasterPlanContext } from "../../context/MasterPlanContext";
import EventTimeline from "../ui/EventTimeline";
import { useViewportSize } from "@mantine/hooks";

const InspectEventModal = ({ opened, close, event, startYear, endYear }) => {
  const { t } = useTranslation();
  const { getShipmentsPlanByEvent } = useMasterPlanContext();
  const [layers, setLayers] = useState(null);
  const {height} = useViewportSize();

  const [plans, setPlans] = useState(null);
  const rowHeight = 80;
  const totalHeight = height - 150;//rowHeight * 6;

  async function getData(event) {
    if (event) {
      const plans = await getShipmentsPlanByEvent(event.id);
      if (plans) {
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
        id: event.id,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
        color: "rgba( 255, 0, 0, 0.2 )",
        name: event.name,
        h: totalHeight,
      };
      layers.push(ret);

      const date = new Date();
      const actualDate = {
        id: event.id,
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
      name: p.shipment.producto,
      //description: p.shipment.despachante,
      values: [
        { label: "Ord.Comp", value: p.shipment.ordenDeCompra },
        { label: "Analista", value: p.shipment.analista },
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
    if (event) {
      getData(event);
    }
  }, [event]);

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
            {plans ? (
              <Group gap={0} grow>
                <EventTimeline
                  startYear={startYear}
                  endYear={endYear}
                  data={plans}
                  h={totalHeight}
                  monthLabels={monthLabels}
                  rowHeight={rowHeight}
                  layers={layers}
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
