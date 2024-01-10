/* eslint-disable react/prop-types */
import { Button, Center, Group, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import UserCrudHeader from "./UserCrudHeader";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";

const UserPanel = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { name: "", age: 0 },
    validate: {
      name: isNotEmpty(t("crud.validation.required")),
    },
  });

  return (
    <Stack gap={"xs"}>
      <UserCrudHeader
        crudTitle={t("crud.users.title")}
        mode={mode}
        onBack={() => {
          navigate(-1);
        }}
      />
      <Center>
        <Stack align="flex-start">
          <TextInput
            w={500}
            {...form.getInputProps("lastname")}
            label={t("crud.users.label.lastname")}
            placeholder={t("crud.users.placeholder.lastname")}
          />
          <TextInput
            w={500}
            {...form.getInputProps("firstname")}
            label={t("crud.users.label.firstname")}
            placeholder={t("crud.users.placeholder.firstname")}
          />
          <TextInput
            w={500}
            {...form.getInputProps("eamil")}
            label={t("crud.users.label.email")}
            placeholder={t("crud.users.placeholder.email")}
          />
          <TextInput
            w={300}
            {...form.getInputProps("sidomkey")}
            label={t("crud.users.label.sidomkey")}
            placeholder={t("crud.users.placeholder.sidomkey")}
          />
          <Group w={"100%"} justify="flex-end">
            <Button onClick={() => {}}>
              {t("general.button.save")}
            </Button>
          </Group>
        </Stack>
      </Center>
    </Stack>
  );
};

export default UserPanel;
