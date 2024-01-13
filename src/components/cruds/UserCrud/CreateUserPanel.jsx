/* eslint-disable react/prop-types */
import { Alert, Center, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useUserCrudContext } from "../../../context/UserCrudContext";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { HEADER_HIGHT } from "../../../data/config";
import { IconAlertCircle } from "@tabler/icons-react";
import CheckList from "../../ui/CheckList";
import CrudHeader from "../CrudHeader";
import CrudButton from "../CrudButton";

const CreateUserPanel = () => {
  const { t } = useTranslation();
  const { roles, create, error, clearError, reloadData } = useUserCrudContext();
  const { height } = useViewportSize();
  const [localRoles, setLocalRoles] = useState(null);

  const navigate = useNavigate();
  const mw = 500;
  const ms = 300;

  useEffect(() => {
    const ret = roles.map((r) => {
      const obj = { id: r.id, name: r.name, checked: false };
      return obj;
    });

    setLocalRoles(ret);
  }, [roles]);

  const form = useForm({
    initialValues: { lastname: "", firstname: "", sidomkey: "", email: "", initialPassword: "" },
    validate: {
      lastname: isNotEmpty(t("crud.validation.required")),
      firstname: isNotEmpty(t("crud.validation.required")),
      email: isEmail(t("crud.validation.invalidEmail")),
      sidomkey: isNotEmpty(t("crud.validation.required")),
      initialPassword: isNotEmpty(t("crud.validation.required")),
    },
  });

  const onRoleCheck = (id, value) => {
    const ret = [...localRoles];
    const found = ret.find((r) => r.id === id);

    if (found) {
      found.checked = value;
    }

    setLocalRoles(ret);
  };

  const onSave = async (values) => {
    clearError();
    const roles = localRoles.filter((r) => r.checked === true);
    await create(values, roles);
    reloadData();
    navigate(-1);
  };

  return (
    <Stack gap={"xs"}>
      <CrudHeader title={t("crud.users.title")} subTitle={t(`crud.users.create`)} mode={"create"} />
      <Center mt={"lg"}>
        <form
          onSubmit={form.onSubmit((values) => {
            onSave(values);
          })}
        >
          <ScrollArea h={height - HEADER_HIGHT - 40} offsetScrollbars>
            <Stack align="flex-start">
              <TextInput
                w={mw}
                {...form.getInputProps("lastname")}
                label={t("crud.users.label.lastname")}
                placeholder={t("crud.users.placeholder.lastname")}
              />
              <TextInput
                w={mw}
                {...form.getInputProps("firstname")}
                label={t("crud.users.label.firstname")}
                placeholder={t("crud.users.placeholder.firstname")}
              />
              <TextInput
                w={mw}
                {...form.getInputProps("email")}
                label={t("crud.users.label.email")}
                placeholder={t("crud.users.placeholder.email")}
              />
              <TextInput
                w={ms}
                {...form.getInputProps("sidomkey")}
                label={t("crud.users.label.sidomkey")}
                placeholder={t("crud.users.placeholder.sidomkey")}
                description={t("crud.users.description.sidomkey")}
              />

              <TextInput
                w={ms}
                {...form.getInputProps("initialPassword")}
                label={t("crud.users.label.initialPassword")}
                placeholder={t("crud.users.placeholder.initialPassword")}
              />

              <CheckList w={mw} label={t("crud.users.label.role")} data={localRoles} onCheck={onRoleCheck} />
              <CrudButton mode={"create"} />

              {error ? (
                <Alert
                  mt={"xs"}
                  w={mw}
                  icon={<IconAlertCircle size={16} />}
                  title={t("general.title.error")}
                  color="red"
                  variant="filled"
                >
                  {t("crud.users.errors.create")}
                </Alert>
              ) : null}
            </Stack>
          </ScrollArea>
        </form>
      </Center>
    </Stack>
  );
};

export default CreateUserPanel;
