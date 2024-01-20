/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Center, Group, LoadingOverlay, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { HEADER_HIGHT, MODULE_APPS_ROOT } from "../../data/config";
import { IconAlertCircle } from "@tabler/icons-react";
import { getUserById, updateUser } from "../../data/user";
import { useUserContext } from "../../context/UserContext";
import AppHeader from "../ui/AppHeader";
import CrudButton from "../cruds/CrudButton";

const UserInfo = () => {
  const { t } = useTranslation();
  const { height } = useViewportSize();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user, logOut } = useUserContext();
  const navigate = useNavigate();
  const mw = 500;
  const ms = 300;

  const form = useForm({
    initialValues: { lastname: "", firstname: "", sidomkey: "", email: "" },
    validate: {
      lastname: isNotEmpty(t("crud.validation.required")),
      firstname: isNotEmpty(t("crud.validation.required")),
      email: isEmail(t("crud.validation.invalidEmail")),
      sidomkey: isNotEmpty(t("crud.validation.required")),
    },
  });

  async function getData() {
    setLoading(true);
    const params = { id: user.id, token: user.token };
    const ret = await getUserById(params);

    form.setFieldValue("lastname", ret.lastname);
    form.setFieldValue("firstname", ret.firstname);
    form.setFieldValue("email", ret.username);
    form.setFieldValue("sidomkey", ret.sidomkey);

    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [user]);

  const onSave = async (values) => {
    let ret = null;
    const params = { token: user.token, userId: user.id, values: values };
    try {
      ret = await updateUser(params);
      logOut();
      navigate(`${MODULE_APPS_ROOT}`);
    } catch (error) {
      setError(error);
    }
    return ret;
  };

  return (
    <Stack gap={"xs"}>
      <AppHeader title={t("general.userInfoTitle")} />
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
                  disabled
                  {...form.getInputProps("sidomkey")}
                  label={t("crud.users.label.sidomkey")}
                  placeholder={t("crud.users.placeholder.sidomkey")}
                  description={t("crud.users.description.sidomkey")}
                />

                <CrudButton mode={"update"} />
                {error ? (
                  <Alert
                    mt={"xs"}
                    w={mw}
                    icon={<IconAlertCircle size={16} />}
                    title={t("general.title.error")}
                    color="red"
                    variant="filled"
                  >
                    {t(`crud.users.errors.update`)}
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

export default UserInfo;
