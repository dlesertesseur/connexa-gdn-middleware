/* eslint-disable react/prop-types */
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const ModalConfirmation = ({ opened, text, onAccept, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal.Root opened={opened} onClose={close} centered size={"sm"}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{t("general.label.confirmation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={0} mih={100} justify="space-between">
            <Group align="flex-start" mb={"sm"} wrap="nowrap">
              <IconAlertCircle color={"blue"} size={48} />
              <Text size="md">{text}</Text>
            </Group>
            <Group justify="flex-end">
              <Button onClick={onAccept}>{t("general.button.accept")}</Button>
              <Button onClick={onCancel}>{t("general.button.cancel")}</Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalConfirmation;
