/* eslint-disable react/prop-types */
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconCircleX, IconInfoCircle} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const ModalNotification = ({ opened, text, state, onClick }) => {
  const { t } = useTranslation();
  const icon = () => {
    let ret = null;
    switch (state) {
      case "error":
        ret = <IconCircleX color="red" size={48} />;
        break;

      case "sucess":
        ret = <IconCircleCheck color="green" size={48} />;
        break;

      default:
        ret = <IconInfoCircle color="blue" size={48} />;
        break;
    }
    return ret;
  };

  return (
    <Modal.Root opened={opened} onClose={close} centered size={"sm"}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{t("general.label.notification")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={0} mih={100} justify="space-between">
            <Group align="flex-start" mb={"sm"} wrap="nowrap">
              {icon()}
              <Text size="md">{text}</Text>
            </Group>
            <Group justify="flex-end">
              <Button onClick={onClick}>{t("general.button.accept")}</Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalNotification;
