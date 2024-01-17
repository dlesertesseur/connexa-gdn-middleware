/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Modal, Stack, Text, NumberInput, Radio } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { addDays, diffBetweenDays, subtractDays } from "../../../utils/utils";
import "dayjs/locale/es";
import "dayjs/locale/en";

const InspectModal = ({ opened, close, sprint, onUpdate }) => {
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(sprint?.endDateTime);
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [anchor, setAnchor] = useState("start");
  const [updateData, setUpadeData] = useState(null);
  const [updateNumber, setUpadeNumber] = useState(null);

  useEffect(() => {
    if (sprint) {
      setStartDate(sprint.startDateTime);
      setEndDate(sprint.endDateTime);
      setNumberOfDays(diffBetweenDays(sprint.startDateTime, sprint.endDateTime));
    }

    setAnchor("start");
  }, [sprint]);

  useEffect(() => {
    switch (anchor) {
      case "start":
        setEndDate(addDays(startDate, numberOfDays));
        break;
      case "end":
        setStartDate(subtractDays(endDate, numberOfDays));
        break;
    }
  }, [updateData]);
  
  useEffect(() => {
    setNumberOfDays(diffBetweenDays(startDate, endDate));
  }, [updateNumber]);

  return (
    <Modal opened={opened} onClose={close} size="sm" title={sprint?.name} centered>
      <Stack>
        <Group>
          <Text>{sprint?.description}</Text>
        </Group>

        <DatesProvider settings={{ locale: i18n.language }}>
          <Group grow>
            <DatePickerInput
              label={t("crud.shipmentPlanner.label.startDate")}
              value={startDate}
              onChange={(event) => {
                setStartDate(event);
                setUpadeNumber(Date.now());
              }}
            />
          </Group>
          <Group grow>
            <DatePickerInput
              label={t("crud.shipmentPlanner.label.endDate")}
              value={endDate}
              onChange={(event) => {
                setEndDate(event);
                setUpadeNumber(Date.now());
              }}
            />
          </Group>
        </DatesProvider>
        <Group grow>
          <Radio.Group
            value={anchor}
            onChange={setAnchor}
            label={t("crud.shipmentPlanner.label.anchor")}
            description={t("crud.shipmentPlanner.description.anchor")}
          >
            <Group mt="xs">
              <Radio value="start" label={t("crud.shipmentPlanner.label.start")} />
              <Radio value="end" label={t("crud.shipmentPlanner.label.end")} />
            </Group>
          </Radio.Group>
        </Group>
        <Group>
          <NumberInput
            min={1}
            label={t("crud.shipmentPlanner.label.numberOfDays")}
            value={numberOfDays}
            onChange={(event) => {
              setNumberOfDays(event);
              setUpadeData(Date.now());
            }}
          />
        </Group>

        <Group justify="flex-end" mt={"md"}>
          <Button
            onClick={() => {
              sprint.startDateTime = startDate;
              sprint.endDateTime = endDate;
              sprint.duration = numberOfDays;
              onUpdate(sprint);
              close();
            }}
          >
            {t("general.button.update")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default InspectModal;
