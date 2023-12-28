/* eslint-disable react/prop-types */
import ImportarionCard from "./ImportarionCard";
import { Button, Flex, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useViewportSize } from "@mantine/hooks";
import { useImportationContext } from "../../context/ImportationContext";
import { HEADER_HIGHT } from "../../data/config";
import { convertMilisegToYYYYMMDDHHMISS } from "../../utils/utils";
import ImportationFilterDialog from "./ImportationFilterDialog";

const ImportationsPanel = () => {
  const { height } = useViewportSize();
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);

  const { statuses, processControl, businessObjectives, analysts, refreshData, loadingTotalsData } =
    useImportationContext();

  const onRefresh = () => {
    refreshData();
  };

  return (
    <Stack spacing={0}>
      {processControl ? (
        <Group justify="space-between" mb={"md"}>
          <Group justify="left" align="center">
            <ImportationFilterDialog
              businessObjectives={businessObjectives}
              analysts={analysts}
              opened={filterOpen}
              open={() => {
                setFilterOpen(true);
              }}
              close={() => {
                setFilterOpen(false);
              }}
              onRefresh={onRefresh}
            />

            <Text size="md" weight={700}>{`${t("importations.label.lastUpdate")} :`}</Text>
            <Text align="center" c="dimmed" size="md" fw={500}>
              {convertMilisegToYYYYMMDDHHMISS(processControl?.dateAndTime)}
            </Text>
          </Group>

          <Button
            size="xs"
            disabled={loadingTotalsData}
            leftSection={<IconRefresh size={16} />}
            onClick={(e) => {
              onRefresh(e);
            }}
          >
            {t("general.button.refresh")}
          </Button>
        </Group>
      ) : null}

      <ScrollArea type="scroll" style={{ width: "100%", height: height - HEADER_HIGHT }}>
        <Flex wrap={"wrap"} gap={"xs"} justify="center">
          {statuses?.map((s) => (
            <ImportarionCard key={s} status={s}/>
          ))}
        </Flex>
      </ScrollArea>
    </Stack>
  );
};

export default ImportationsPanel;
