/* eslint-disable react/prop-types */
import { Button, Group, Skeleton, Text, Title } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { convertMilisegToYYYYMMDD } from "../../../utils/utils";

const ShipmentPlannerEditorToolbar = ({ save, shipment, event, saving }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (shipment) {
      //console.log("ShipmentPlannerEditorToolbar shipment ->", shipment);
    }
  }, [shipment]);

  const onSave = () => {
    save();
  };

  return (
    <Group justify="space-between">
      {event ? (
        <Group>
          <Title size="h5">{event?.name}</Title>
          <Title size="h5">{event?.description}</Title>
          <Title size="h5">{`${convertMilisegToYYYYMMDD(event?.startDateTime)} ${t(
            "general.label.to"
          )} ${convertMilisegToYYYYMMDD(event?.endDateTime)}`}</Title>
        </Group>
      ) : (
        <Group>
          <Skeleton w={100} height={30} radius="xs" />
          <Skeleton w={150} height={30} radius="xs" />
          <Skeleton w={150} height={30} radius="xs" />
        </Group>
      )}
      <Group>
        <Button
          loading={saving}
          leftSection={<IconDeviceFloppy size={20} />}
          onClick={onSave}
          disabled={save === null ? true : false}
          placeholder={t("general.button.save")}
          size="xs"
        >
          <Text size="xs">{t("general.button.save")}</Text>
        </Button>
      </Group>
    </Group>
  );
};

export default ShipmentPlannerEditorToolbar;
