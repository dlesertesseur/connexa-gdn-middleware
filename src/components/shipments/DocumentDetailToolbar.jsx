/* eslint-disable react/prop-types */
import { Anchor, Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { config } from "../../data/config";
import { useNavigate } from "react-router-dom";

const DocumentDetailToolbar = ({ disabled, statusSelected, reference, accessSidom = true }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        {statusSelected ? (
          <Group gap={0} wrap="nowrap">
            <Text size={"md"} fw={600}>
              {`${statusSelected} / `}
            </Text>

            {accessSidom ? (
              <Anchor ml={5} disabled={disabled} href={`${config.SIDOM_URL}${reference}`} target="_blank">
                <Text fw={600} size="md" c={"blue"}>
                  {reference}
                </Text>
              </Anchor>
            ) : null}
          </Group>
        ) : (
          <Group gap={"xs"}>
            {accessSidom ? (
              <>
                <Text fw={600} size="md">
                  {t("crud.documents.label.viewDocInSidom")}
                </Text>
                <Anchor ml={5} disabled={disabled} href={`${config.SIDOM_URL}${reference}`} target="_blank">
                  <Text fw={600} size="md" c={"blue"}>
                    {reference}
                  </Text>
                </Anchor>
              </>
            ) : null}
          </Group>
        )}
        <Group>
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
