/* eslint-disable react/prop-types */
import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ShipmentStatusDetailToolbar = ({ back = null, title, activeMap }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toLogistics = () => {
    const params = {
      state: {
        title: title,
      },
      options: { replace: false },
    };
    navigate(`logistics`, params);
  };

  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group>
          <Text size={"md"} weight={600}>
            {title}
          </Text>
        </Group>

        <Group>
          {activeMap ? (
            <Button onClick={toLogistics} disabled={back === null ? true : false} size="xs">
              <Text size="xs">{t("shipments.label.seeOnMap")}</Text>
            </Button>
          ) : null}

          <Button onClick={back} disabled={back === null ? true : false} size="xs">
            <Text size="xs">{t("general.button.back")}</Text>
          </Button>
        </Group>
      </Group>
    </Stack>
  );
};

export default ShipmentStatusDetailToolbar;
