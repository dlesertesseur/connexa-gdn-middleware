/* eslint-disable react/prop-types */
import { Anchor, Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ShipmentDetailToolbar = ({ disabled, statusSelected, reference, anchorUrl }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group gap={0} wrap="nowrap">
          <Text size={"md"} fw={600}>
            {`${statusSelected} / `}
          </Text>

          <Anchor ml={5} disabled={disabled} href={anchorUrl} target="_blank">
            <Text fw={600} size="md" c={"blue"}>
              {reference}
            </Text>
          </Anchor>
        </Group>

        <Group>
          <Button
            onClick={() => {
              const params = {
                state: {
                  reference: reference,
                },
                options: { replace: true },
              };
              navigate("documentDetail", params);
            }}
            size="xs"
          >
            <Text size="xs">{t("shipments.button.purchaseOrder")}</Text>
          </Button>
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

export default ShipmentDetailToolbar;
