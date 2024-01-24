/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Fieldset, Group, LoadingOverlay, NumberInput, ScrollArea, Select, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { HEADER_HIGHT } from "../../../data/config";
import { useEffect } from "react";
import { useShipmentPlannerContext } from "../../../context/ShipmentPlannerContext";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { addDays, convertMilisegToYYYYMMDD, subtractDays } from "../../../utils/utils";
import ModalNotification from "../../ui/ModalNotification";
import Header from "./Header";
import CrudButton from "../CrudButton";
import "dayjs/locale/es";
import "dayjs/locale/en";
import Label from "../../ui/Label";

const CreateShipmentPlanner = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { height } = useViewportSize();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [shipmentData, setShipmentData] = useState(null);
  const mw = 500;
  const ms = 300;

  const { businessObjectives, selectedShipmentId, getShipmentPlanById, update, reload } = useShipmentPlannerContext();

  useEffect(() => {
    const getData = async () => {
      const shipmentData = await getShipmentPlanById(selectedShipmentId);
      setShipmentData(shipmentData);
    };
    getData();
  }, []);

  useEffect(() => {
    if (businessObjectives) {
      const events = businessObjectives.map((b) => {
        const label = `${b.name}  (${convertMilisegToYYYYMMDD(b.startDateTime)} ${t(
          "general.label.to"
        )} ${convertMilisegToYYYYMMDD(b.endDateTime)})`;
        const ret = { label: label, value: b.id, startDateTime: b.startDateTime, endDateTime: b.endDateTime };
        return ret;
      });

      setEvents(events);
    }
  }, [businessObjectives]);

  const form = useForm({
    initialValues: {
      event: "",
      salesPeriodStartDate: null,
      salesPeriod: "1",
      distributionPeriod: "1",
      receptionPeriod: "1",
      shippingPeriod: "1",
      preparationPeriod: "1",
    },
    validate: {
      event: isNotEmpty(t("crud.validation.required")),
      salesPeriodStartDate: isNotEmpty(t("crud.validation.required")),
      salesPeriod: isNotEmpty(t("crud.validation.required")),
      distributionPeriod: isNotEmpty(t("crud.validation.required")),
      receptionPeriod: isNotEmpty(t("crud.validation.required")),
      shippingPeriod: isNotEmpty(t("crud.validation.required")),
      preparationPeriod: isNotEmpty(t("crud.validation.required")),
    },
  });

  const onCreate = async (values) => {
    setLoading(true);

    const baseDate = values.salesPeriodStartDate;

    const salesStart = baseDate;
    const salesEnd = addDays(baseDate, values.salesPeriod);

    const distributionEnd = new Date(salesStart);
    const distributionStart = subtractDays(distributionEnd, values.distributionPeriod);

    const receptionEnd = new Date(distributionStart);
    const receptionStart = subtractDays(receptionEnd, values.receptionPeriod);

    const shippingEnd = new Date(receptionStart);
    const shippingStart = subtractDays(shippingEnd, values.shippingPeriod);

    const preparationEnd = new Date(shippingStart);
    const preparationStart = subtractDays(preparationEnd, values.preparationPeriod);

    const plan = {
      shipmentCode: shipmentData.shipment.ordenDeCompra,
      eventId: values.event,
      salesStart: salesStart,
      salesEnd: salesEnd,
      salesDurationInDays: values.salesPeriod,
      salesPercentage: 0,
      distributionStart: distributionStart,
      distributionEnd: distributionEnd,
      distributionDurationInDays: values.distributionPeriod,
      distributionPercentage: 0,
      receptionStart: receptionStart,
      receptionEnd: receptionEnd,
      receptionDurationInDays: values.receptionPeriod,
      receptionPercentage: 0,
      shippingStart: shippingStart,
      shippingEnd: shippingEnd,
      shippingDurationInDays: values.shippingPeriod,
      shippingPercentage: 0,
      preparationStart: preparationStart,
      preparationEnd: preparationEnd,
      preparationDurationInDays: values.preparationPeriod,
      preparationPercentage: 0,
    };

    try {
      await update(plan);
      navigate(-1);
      reload();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <Stack gap={"xs"}>
      <ModalNotification
        opened={error}
        text={error?.message}
        state={"error"}
        onClick={() => {
          setError(null);
        }}
      />

      <Header title={t("crud.createShipmentPlanner.title")} />
      <Center mt={"lg"}>
        <form
          onSubmit={form.onSubmit((values) => {
            onCreate(values);
          })}
        >
          <ScrollArea h={height - HEADER_HIGHT - 40} offsetScrollbars>
            <LoadingOverlay visible={loading} />
            <Group align="flex-start" wrap="nowrap">
              <Fieldset legend={t("crud.createShipmentPlanner.label.shipmentInfo")} variant="filled">
                <Stack align="flex-start" py={3} gap={"sm"}>
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.reference")} value={shipmentData?.shipment.ordenDeCompra} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.product")} value={shipmentData?.shipment.producto} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.analyst")} value={shipmentData?.shipment.analista} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.event")} value={shipmentData?.shipment.evento} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.requiredInWarehouse")} value={shipmentData?.shipment.necesidadEnCd} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.provider")} value={shipmentData?.shipment.proveedor} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.countryOfOrigin")} value={shipmentData?.shipment.paisOrigen} />
                  <Label w={ms} title={t("crud.createShipmentPlanner.label.shipmentValue")} value={shipmentData?.shipment.valorDelEmbarque} />
                </Stack>
              </Fieldset>
              <Stack align="flex-start">
                <Select
                  data={events}
                  w={mw}
                  {...form.getInputProps("event")}
                  label={t("crud.createShipmentPlanner.label.businessObjective")}
                  placeholder={t("crud.createShipmentPlanner.placeholder.event")}
                />

                <DatesProvider settings={{ locale: i18n.language }}>
                  <DatePickerInput
                    w={ms}
                    {...form.getInputProps("salesPeriodStartDate")}
                    label={t("crud.createShipmentPlanner.label.salesPeriodStartDate")}
                    placeholder={t("crud.createShipmentPlanner.placeholder.salesPeriodStartDate")}
                  />
                </DatesProvider>
                <NumberInput
                  w={ms}
                  {...form.getInputProps("salesPeriod")}
                  label={t("crud.createShipmentPlanner.label.salesPeriod")}
                  description={t("crud.createShipmentPlanner.description.period")}
                  min={1}
                />
                <NumberInput
                  w={ms}
                  {...form.getInputProps("distributionPeriod")}
                  label={t("crud.createShipmentPlanner.label.distributionPeriod")}
                  description={t("crud.createShipmentPlanner.description.period")}
                  min={1}
                />
                <NumberInput
                  w={ms}
                  {...form.getInputProps("receptionPeriod")}
                  label={t("crud.createShipmentPlanner.label.receptionPeriod")}
                  description={t("crud.createShipmentPlanner.description.period")}
                  min={1}
                />
                <NumberInput
                  w={ms}
                  {...form.getInputProps("shippingPeriod")}
                  label={t("crud.createShipmentPlanner.label.shippingPeriod")}
                  description={t("crud.createShipmentPlanner.description.period")}
                  min={1}
                />
                <NumberInput
                  w={ms}
                  {...form.getInputProps("preparationPeriod")}
                  label={t("crud.createShipmentPlanner.label.preparationPeriod")}
                  description={t("crud.createShipmentPlanner.description.period")}
                  min={1}
                />
                <CrudButton mode={"create"} />
              </Stack>
            </Group>
          </ScrollArea>
        </form>
      </Center>
    </Stack>
  );
};

export default CreateShipmentPlanner;
