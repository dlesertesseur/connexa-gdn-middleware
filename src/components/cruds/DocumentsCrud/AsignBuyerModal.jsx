/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Modal, Select, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllBuyers } from "../../../data/buyers";
import { useUserContext } from "../../../context/UserContext";

const AsignBuyerModal = ({ opened, onAccept, onCancel }) => {
  const { t } = useTranslation();

  const { user } = useUserContext();
  const [buyers, setBuyers] = useState();
  const [buyer, setBuyer] = useState();

  async function getData() {
    const params = { token: user.token };
    const buyers = await getAllBuyers(params);
    const list = buyers.map((b) => {
      const ret = `${b.lastname}, ${b.firstname}`;
      return ret;
    });

    setBuyers(list);
  }

  useEffect(() => {
    getData();
    setBuyer(null);
  }, [opened]);

  return (
    <Modal.Root opened={opened} onClose={close} centered size={"sm"}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{t("crud.documents.assign")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={0} mih={100} justify="space-between">
            <Group grow align="flex-start" mb={"sm"} wrap="nowrap">
              <Select
                label={t("crud.documents.label.buyerList")}
                placeholder={t("crud.documents.placeholder.selectAbuyer")}
                data={buyers}
                value={buyer}
                onChange={setBuyer}
              />
            </Group>
            <Group justify="flex-end" mt={"md"}>
              <Button
                onClick={() => {
                  onAccept(buyer);
                }}
                disabled={!buyer}
              >
                {t("general.button.assign")}
              </Button>
              <Button onClick={onCancel}>{t("general.button.cancel")}</Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AsignBuyerModal;
