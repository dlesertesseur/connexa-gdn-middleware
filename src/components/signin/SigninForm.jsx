import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Alert,
  Stack,
  Text,
  Container,
  Title,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/UserContext";
import Logo from "../Logo";

export function SigninForm() {
  const { t, i18n } = useTranslation();
  const [loading] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const [localeSelected, setLocaleSelected] = useState(null);

  const { authenticate, error } = useUserContext();

  const languages = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
  ];

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : t("auth.validation.emailFormat")),
      password: (val) => (val.length <= 2 ? t("auth.validation.passwordFormat") : null),
    },
  });

  const onSignIn = async (data) => {
    await authenticate(data);
  };

  useEffect(() => {
    if (localeSelected) {
      //redirect(`/${localeSelected}`);
    }
  }, [localeSelected]);

  return (
    <Container>
      <Stack m={"xl"} p={"xl"} align="center">
        <Group justify="center" py={20}>
          <Title>{t("auth.title")}</Title>
        </Group>
        <Paper withBorder shadow="md" px={30} pb={30} radius="md" bg={"gray.1"} w={400}>
          <Group justify="center" py={20}>
            <Logo image={"/logos/logo.png"} size={70} />
          </Group>
          <form
            autoComplete="false"
            onSubmit={form.onSubmit((values) => {
              onSignIn({ email: values.email, password: values.password });
            })}
          >
            <TextInput
              label={t("auth.label.email")}
              placeholder={t("auth.placeholder.email")}
              onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email}
            />
            <PasswordInput
              label={t("auth.label.password")}
              placeholder={t("auth.placeholder.password")}
              autoComplete="off"
              mt="md"
              onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password}
            />

            <Select
              mt="md"
              label={t("auth.label.language")}
              value={language}
              onChange={(e) => {
                setLanguage(e);
                setLocaleSelected(e);
              }}
              data={languages}
            />

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              {t("auth.button.signIn")}
            </Button>
          </form>
          {error ? (
            <Alert
              mt={"sm"}
              icon={<IconAlertCircle size={16} />}
              title={t("auth.errors.title")}
              color="red"
              variant="filled"
            >
              {t("auth.errors.text")}
            </Alert>
          ) : null}
        </Paper>

        <Group justify="space-between" mt={"xl"}>
          <Logo height={16} width={16 * 6.38} image="/logos/zeetrex.png" />
          <Text size={"xs"} weight={500} c="gray">
            {t("auth.label.copyright")}
          </Text>
        </Group>
      </Stack>
    </Container>
  );
}
