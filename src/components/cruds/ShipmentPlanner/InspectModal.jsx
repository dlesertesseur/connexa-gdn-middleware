/* eslint-disable react/prop-types */
import { Button, Group, Modal, Stack, Text } from "@mantine/core";

const InspectModal = ({ opened, close, event }) => {
  return (
    <Modal opened={opened} onClose={close} size="md" title={event?.name} centered>
      <Stack>
        <Text>{event?.description}</Text>

        <Group wrap="nowrap" mt="md"></Group>

        <Group justify="flex-end" >
          <Button onClick={close}>Cerrar</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default InspectModal;
