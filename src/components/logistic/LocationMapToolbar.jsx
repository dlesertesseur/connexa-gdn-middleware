/* eslint-disable react/prop-types */
import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LocationMapToolbar = ({ title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group>
          <Text size={"md"} weight={600}>
            {title}
          </Text>
        </Group>

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

export default LocationMapToolbar;
