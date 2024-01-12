/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useEventCrudContext } from "../../../context/EventCrudContext";
import { useViewportSize } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { Alert, Center, Group, LoadingOverlay, ScrollArea, Stack, TextInput } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { HEADER_HIGHT } from "../../../data/config";
import { useNavigate } from "react-router-dom";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import "dayjs/locale/es";
import "dayjs/locale/en";
import "@mantine/dates/styles.css";
import CrudHeader from "../CrudHeader";
import CrudButton from "../CrudButton";

const EventPanel = ({ mode }) => {
  const { t, i18n } = useTranslation();
  const { create, update, remove, error, clearError, clearSelection, selectedRowId, getById, reloadData } =
    useEventCrudContext();
  const { height } = useViewportSize();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mw = 500;
  const ms = 300;

  const form = useForm({
    initialValues: { name: "", description: "", sidomkeys: "", startDateTime: null, endDateTime: null },
    validate:
      mode === "delete"
        ? {}
        : {
            name: isNotEmpty(t("crud.validation.required")),
            description: isNotEmpty(t("crud.validation.required")),
            sidomkeys: isNotEmpty(t("crud.validation.required")),
            startDateTime: isNotEmpty(t("crud.validation.required")),
            endDateTime: isNotEmpty(t("crud.validation.required")),
          },
  });

  async function getData() {
    if (selectedRowId) {
      setLoading(true);
      const ret = await getById(selectedRowId);
      if (ret) {
        form.setFieldValue("name", ret.name);
        form.setFieldValue("description", ret.description);
        form.setFieldValue("sidomkeys", ret.sidomkeys);
        form.setFieldValue("startDateTime", new Date(ret.startDateTime));
        form.setFieldValue("endDateTime", new Date(ret.endDateTime));
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    if (mode !== "create") {
      getData();
    }
  }, [selectedRowId]);

  const onSave = async (values) => {
    clearError();
    switch (mode) {
      case "create":
        await create(values);
        break;

      case "update":
        await update(selectedRowId, values);
        break;

      case "delete":
        await remove(selectedRowId);
        clearSelection();
        break;

      default:
        break;
    }
    reloadData();
    navigate(-1);
  };

  function isDisabled() {
    const ret = mode === "delete" ? true : false;
    return ret;
  }

  function getModeTitle() {
    const ret = t(`crud.events.${mode}`);
    return ret;
  }

  return (
    <Stack gap={"xs"}>
      <CrudHeader title={t("crud.events.title")} subTitle={getModeTitle()} mode={mode} />

      <Center mt={"lg"}>
        <form
          onSubmit={form.onSubmit((values) => {
            onSave(values);
          })}
        >
          <ScrollArea h={height - HEADER_HIGHT - 40} offsetScrollbars>
            {loading ? (
              <Group w={mw} h={"100%"}>
                <LoadingOverlay visible />
              </Group>
            ) : (
              <Stack align="flex-start">
                <TextInput
                  disabled={isDisabled()}
                  w={mw}
                  {...form.getInputProps("name")}
                  label={t("crud.events.label.name")}
                  placeholder={t("crud.events.placeholder.name")}
                />
                <TextInput
                  disabled={isDisabled()}
                  w={mw}
                  {...form.getInputProps("description")}
                  label={t("crud.events.label.description")}
                  placeholder={t("crud.events.placeholder.description")}
                />
                <TextInput
                  disabled={isDisabled()}
                  w={mw}
                  {...form.getInputProps("sidomkeys")}
                  label={t("crud.events.label.sidomkeys")}
                  placeholder={t("crud.events.placeholder.sidomkeys")}
                />

                <DatesProvider settings={{ locale: i18n.language }}>
                  <DatePickerInput
                    disabled={isDisabled()}
                    w={ms}
                    {...form.getInputProps("startDateTime")}
                    label={t("crud.events.label.startDateTime")}
                    placeholder={t("crud.events.placeholder.startDateTime")}
                  />

                  <DatePickerInput
                    disabled={isDisabled()}
                    w={ms}
                    {...form.getInputProps("endDateTime")}
                    label={t("crud.events.label.endDateTime")}
                    placeholder={t("crud.events.placeholder.endDateTime")}
                  />
                </DatesProvider>

                <CrudButton mode={mode} />

                {error ? (
                  <Alert
                    mt={"xs"}
                    w={mw}
                    icon={<IconAlertCircle size={16} />}
                    title={t("general.title.error")}
                    color="red"
                    variant="filled"
                  >
                    {t(`crud.events.errors.${mode}`)}
                  </Alert>
                ) : null}
              </Stack>
            )}
          </ScrollArea>
        </form>
      </Center>
    </Stack>
  );
};

export default EventPanel;
