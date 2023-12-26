/* eslint-disable react/prop-types */
import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

const ImportationStatusDetailToolbar = ({ back = null, title }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group>
          <Text size={"md"} weight={600}>{title}</Text>
        </Group>
        <Button onClick={back} disabled={back === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button>
      </Group>
    </Stack>
  );
};

export default ImportationStatusDetailToolbar;
