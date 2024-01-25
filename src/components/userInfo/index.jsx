/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Center, Group, LoadingOverlay, Modal, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { MODULE_APPS_ROOT } from "../../data/config";
import { IconAlertCircle } from "@tabler/icons-react";
import { getUserById, updateUser } from "../../data/user";
import { useUserContext } from "../../context/UserContext";
import CrudButton from "../cruds/CrudButton";

const UserInfo = ({opened, close}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user, logOut, userLog } = useUserContext();
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
      userLog("save user info");
      navigate(`${MODULE_APPS_ROOT}`);
    } catch (error) {
      setError(error);
    }
    return ret;
  };

  return (
    <Modal opened={opened} onClose={close} size="auto" title={t("general.userInfoTitle")} centered>
      <Stack gap={"xs"}>
        <Center mt={"lg"}>
          <form
            onSubmit={form.onSubmit((values) => {
              onSave(values);
            })}
          >
            <ScrollArea offsetScrollbars>
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
    </Modal>
  );
};

export default UserInfo;
