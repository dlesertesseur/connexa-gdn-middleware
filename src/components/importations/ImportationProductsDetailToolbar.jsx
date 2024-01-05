/* eslint-disable react/prop-types */
import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { config } from "../../data/config";

const ImportationProductsDetailToolbar = ({ back = null, statusSelected, reference }) => {
  const { t } = useTranslation();

  const openSidomApp = () => {
    const url = `${config.SIDOM_URL}${reference}`;

    console.log("openSidomApp url -> ", url);
    
    const win = window.open(url, '_blank');
    win.focus();
  };

  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group gap={0} wrap="nowrap">
          <Text size={"md"} weight={600}>
            {`${statusSelected} / `}
          </Text>

          <Button
            ml={5}
            size="xs"
            onClick={() => {
              openSidomApp(reference);
            }}
          >
            <Text fw={400} size="sm">
              {reference}
            </Text>
          </Button>
        </Group>
        <Button onClick={back} disabled={back === null ? true : false} size="xs">
          <Text size="xs">{t("general.button.back")}</Text>
        </Button>
      </Group>
    </Stack>
  );
};

export default ImportationProductsDetailToolbar;
