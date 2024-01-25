/* eslint-disable react/prop-types */
import { Center, Modal, PasswordInput, ScrollArea, Stack } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { MODULE_APPS_ROOT } from "../../data/config";
import { changePassword } from "../../data/user";
import { useUserContext } from "../../context/UserContext";
import CrudButton from "../cruds/CrudButton";
import ModalNotification from "../ui/ModalNotification";

const ChangePassword = ({opened, close}) => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { user, logOut, userLog } = useUserContext();
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
    <Modal opened={opened} onClose={close} size="auto" title={t("general.changePasswordTitle")} centered>
      <Stack gap={"xs"}>
        <ModalNotification
          opened={notificationOpen}
          text={error ? error : t("general.message.changePassword")}
          state={error ? "error" : "sucess"}
          onClick={() => {
            setNotificationOpen(false);
            if (!error) {
              userLog("changePassword");
              logOut();
              navigate(`${MODULE_APPS_ROOT}`);
            }
          }}
        />

        <Center mt={"lg"}>
          <form
            onSubmit={form.onSubmit((values) => {
              onSave(values);
            })}
          >
            <ScrollArea offsetScrollbars>
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
    </Modal>
  );
};

export default ChangePassword;
