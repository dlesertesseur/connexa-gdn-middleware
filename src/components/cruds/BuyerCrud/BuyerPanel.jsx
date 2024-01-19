/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useViewportSize } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { Alert, Center, Group, LoadingOverlay, ScrollArea, Stack, TextInput } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { HEADER_HIGHT } from "../../../data/config";
import { useBuyerCrudContext } from "../../../context/BuyerCrudContext";
import CrudButton from "../CrudButton";
import "@mantine/dates/styles.css";
import PanelHeader from "./PanelHeader";

const BuyerPanel = ({ mode }) => {
  const { t } = useTranslation();
  const {
    create,
    update,
    remove,
    error,
    clearError,
    clearSelection,
    selectedRowId,
    getById,
    reloadData,
    setActiveComponent
  } = useBuyerCrudContext();
  const { height } = useViewportSize();
  const [loading, setLoading] = useState(false);
  const mw = 500;

  const form = useForm({
    initialValues: { firstname: "", lastname: "" },
    validate:
      mode === "delete"
        ? {}
        : {
            firstname: isNotEmpty(t("crud.validation.required")),
            lastname: isNotEmpty(t("crud.validation.required")),
          },
  });

  async function getData() {
    if (selectedRowId) {
      setLoading(true);
      const ret = await getById(selectedRowId);
      if (ret) {
        form.setFieldValue("firstname", ret.firstname);
        form.setFieldValue("lastname", ret.lastname);
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
    setActiveComponent("list");
  };

  function isDisabled() {
    const ret = mode === "delete" ? true : false;
    return ret;
  }

  function getModeTitle() {
    const ret = t(`crud.buyers.${mode}`);
    return ret;
  }

  return (
    <Stack gap={"xs"}>
      <PanelHeader
        title={t("crud.buyers.title")}
        subTitle={getModeTitle()}
        mode={mode}
        onBack={() => {
          setActiveComponent("list");
        }}
      />

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
                  {...form.getInputProps("firstname")}
                  label={t("crud.buyers.label.firstname")}
                  placeholder={t("crud.buyers.placeholder.firstname")}
                />
                <TextInput
                  disabled={isDisabled()}
                  w={mw}
                  {...form.getInputProps("lastname")}
                  label={t("crud.buyers.label.lastname")}
                  placeholder={t("crud.buyers.placeholder.lastname")}
                />

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
                    {t(`crud.buyers.errors.${mode}`)}
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

export default BuyerPanel;
