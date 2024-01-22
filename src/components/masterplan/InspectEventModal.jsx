/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMasterPlanContext } from "../../context/MasterPlanContext";

const InspectEventModal = ({ opened, close, event }) => {
  const { t } = useTranslation();
  const {getShipmentsPlanByEvent} = useMasterPlanContext();


  async function getData(event){
    if(event){
      const plans = await getShipmentsPlanByEvent(event.id);
      console.log(plans);
    }
  }

  useEffect(() => {
    if(event){
      getData(event);
    }
  }, [event]);

  return (
    <Modal opened={opened} onClose={close} size="sm" title={event?.name} centered>
      <Stack>
        <Group>
          <Text>{event?.description}</Text>
        </Group>

        <Group justify="flex-end" mt={"md"}>
          <Button>{t("general.button.update")}</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default InspectEventModal;
