/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Alert, Button, Center, Group, LoadingOverlay, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useUserCrudContext } from "../../../context/UserCrudContext";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { HEADER_HIGHT } from "../../../data/config";
import { IconAlertCircle } from "@tabler/icons-react";
import UserCrudHeader from "./UserCrudHeader";
import CheckList from "../../CheckList";

const UserPanel = ({ mode }) => {
  const { t } = useTranslation();
  const { roles, update, remove, error, clearError, selectedUserId, getById, addRole, removeRole, reloadData } =
    useUserCrudContext();
  const { height } = useViewportSize();
  const [localRoles, setLocalRoles] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const mw = 500;
  const ms = 300;

  const form = useForm({
    initialValues: { lastname: "", firstname: "", sidomkey: "", email: "" },
    validate:
      mode === "delete"
        ? {}
        : {
            lastname: isNotEmpty(t("crud.validation.required")),
            firstname: isNotEmpty(t("crud.validation.required")),
            email: isEmail(t("crud.validation.invalidEmail")),
            sidomkey: isNotEmpty(t("crud.validation.required")),
          },
  });

  async function getData() {
    setLoading(true);
    const ret = await getById(selectedUserId);
    form.setFieldValue("lastname", ret.lastname);
    form.setFieldValue("firstname", ret.firstname);
    form.setFieldValue("email", ret.username);
    form.setFieldValue("sidomkey", ret.sidomkey);

    const roleIds = ret.roles.map((r) => r.id);

    const list = roles.map((r) => {
      const obj = { id: r.id, name: r.name, checked: roleIds.includes(r.id) };
      return obj;
    });

    setLocalRoles(list);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [selectedUserId]);

  const onRoleCheck = (id, value) => {
    const ret = [...localRoles];
    const found = ret.find((r) => r.id === id);

    if (found) {
      found.checked = value;
    }

    setLocalRoles(ret);

    if (value) {
      addRole(selectedUserId, id);
    } else {
      removeRole(selectedUserId, id);
    }
  };

  const onSave = (values) => {
    clearError();
    if (mode === "delete") {
      remove(selectedUserId);
    } else {
      update(selectedUserId, values);
    }
    reloadData();
    navigate(-1);
  };

  function isDisabled() {
    const ret = mode === "delete" ? true : false;
    return ret;
  }

  return (
    <Stack gap={"xs"}>
      <UserCrudHeader
        crudTitle={t("crud.users.title")}
        mode={mode}
        onBack={() => {
          navigate(-1);
          clearError();
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
                  {...form.getInputProps("lastname")}
                  label={t("crud.users.label.lastname")}
                  placeholder={t("crud.users.placeholder.lastname")}
                />
                <TextInput
                  disabled={isDisabled()}
                  w={mw}
                  {...form.getInputProps("firstname")}
                  label={t("crud.users.label.firstname")}
                  placeholder={t("crud.users.placeholder.firstname")}
                />
                <TextInput
                  disabled={isDisabled()}
                  w={mw}
                  {...form.getInputProps("email")}
                  label={t("crud.users.label.email")}
                  placeholder={t("crud.users.placeholder.email")}
                />
                <TextInput
                  disabled={isDisabled()}
                  w={ms}
                  {...form.getInputProps("sidomkey")}
                  label={t("crud.users.label.sidomkey")}
                  placeholder={t("crud.users.placeholder.sidomkey")}
                  description={t("crud.users.description.sidomkey")}
                />

                <CheckList
                  disabled={isDisabled()}
                  w={mw}
                  label={t("crud.users.label.role")}
                  data={localRoles}
                  onCheck={onRoleCheck}
                />

                <Group w={"100%"} mt={"lg"} justify="flex-end">
                  <Button type="submit">{t("general.button.save")}</Button>
                </Group>
                {error ? (
                  <Alert
                    mt={"xs"}
                    w={mw}
                    icon={<IconAlertCircle size={16} />}
                    title={t("general.title.error")}
                    color="red"
                    variant="filled"
                  >
                    {t(`crud.users.errors.${mode}`)}
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

export default UserPanel;
