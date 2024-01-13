import { Center, PasswordInput, ScrollArea, Stack } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { HEADER_HIGHT, MODULE_APPS_ROOT } from "../../data/config";
import { changePassword } from "../../data/user";
import { useUserContext } from "../../context/UserContext";
import AppHeader from "../ui/AppHeader";
import CrudButton from "../cruds/CrudButton";
import ModalNotification from "../ui/ModalNotification";

const ChangePassword = () => {
  const { t } = useTranslation();
  const { height } = useViewportSize();
  const [error, setError] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { user, logOut } = useUserContext();
  const navigate = useNavigate();
  const mw = 500;

  const form = useForm({
    initialValues: { actualPassword: "", newPassword1: "", newPassword2: "" },
    validate: {
      actualPassword: isNotEmpty(t("crud.validation.required")),
      newPassword1: isNotEmpty(t("crud.validation.required")),
      newPassword2: (value, values) => (value !== values.newPassword1 ? t("crud.validation.passwordNotMatch") : null),
    },
  });

  const onSave = async (values) => {
    const params = {
      token: user.token,
      userId: user.id,
      actualPassword: values.actualPassword,
      newPassword: values.newPassword2,
    };

    try {
      await changePassword(params);
    } catch (error) {
      setError(error.message);
    }
    setNotificationOpen(true);
  };

  return (
    <Stack gap={"xs"}>
      <ModalNotification
        opened={notificationOpen}
        text={error ? error : t("general.message.changePassword")}
        state={error ? "error" : "sucess"}
        onClick={() => {
          setNotificationOpen(false);
          if(!error){
            logOut();
            navigate(`${MODULE_APPS_ROOT}`);      
          }
        }}
      />

      <AppHeader title={t("general.changePasswordTitle")} />
      <Center mt={"lg"}>
        <form
          onSubmit={form.onSubmit((values) => {
            onSave(values);
          })}
        >
          <ScrollArea h={height - HEADER_HIGHT - 40} offsetScrollbars>
            <Stack align="flex-start">
              <PasswordInput
                w={mw}
                {...form.getInputProps("actualPassword")}
                label={t("changePassword.label.actualPassword")}
                placeholder={t("changePassword.placeholder.actualPassword")}
              />
              <PasswordInput
                w={mw}
                {...form.getInputProps("newPassword1")}
                label={t("changePassword.label.newPassword1")}
                placeholder={t("changePassword.placeholder.newPassword1")}
              />
              <PasswordInput
                w={mw}
                {...form.getInputProps("newPassword2")}
                label={t("changePassword.label.newPassword2")}
                placeholder={t("changePassword.placeholder.newPassword2")}
              />

              <CrudButton mode={"update"} />
            </Stack>
          </ScrollArea>
        </form>
      </Center>
    </Stack>
  );
};

export default ChangePassword;
