/* eslint-disable react/prop-types */
import { Anchor, Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { config } from "../../data/config";
import { useNavigate } from "react-router-dom";

const DocumentDetailToolbar = ({ disabled, statusSelected, reference }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group gap={0} wrap="nowrap">
          <Text size={"md"} fw={600}>
            {`${statusSelected} / `}
          </Text>

          <Anchor ml={5} disabled={disabled} href={`${config.SIDOM_URL}${reference}`} target="_blank">
            <Text fw={600} size="md" c={"blue"}>
              {reference}
            </Text>
          </Anchor>
        </Group>

        <Group>
          {/* <Button
            onClick={() => {
              navigate(-1);
            }}
            size="xs"
          >
            <Text size="xs">{t("shipments.button.purchaseOrder")}</Text>
          </Button> */}
          <Button
            onClick={() => {
              navigate(-1);
            }}
            size="xs"
          >
            <Text size="xs">{t("general.button.back")}</Text>
          </Button>
        </Group>
      </Group>
    </Stack>
  );
};

export default DocumentDetailToolbar;
