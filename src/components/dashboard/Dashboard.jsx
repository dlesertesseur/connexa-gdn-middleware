import { SimpleGrid, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import HorizontalBarsPanel from "./HorizontalBarsPanel";
import LightIndicatorsPanel from "./LightIndicatorsPanel";
import InspectPanelModal from "./InspectPanelModal";

const Importations = () => {
  const { t } = useTranslation();

  const [lightIndicatorOpened, { close, open }] = useDisclosure(false);
  const [selectedPanel, setSelectedPanel] = useState(null);

  const onPanelClick = (title, name, data) => {
    const panel = { title: title, name: name, data: data };
    setSelectedPanel(panel);
    open();
  };

  return (
    <Stack>
      {lightIndicatorOpened ? (
        <InspectPanelModal opened={lightIndicatorOpened} close={close} panel={selectedPanel} />
      ) : null}

      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 3 }}
        spacing={{ base: "xs", sm: "md" }}
        verticalSpacing={{ base: "xs", sm: "md" }}
      >
        <HorizontalBarsPanel
          title={t("card.title.1")}
          name={"indicatorByCurrency"}
          color="blue"
          onclick={onPanelClick}
        />
        <LightIndicatorsPanel
          title={t("card.title.2")}
          name={"indicatorByScheduleCompliance"}
          onclick={onPanelClick}
        />
        <HorizontalBarsPanel
          title={t("card.title.3")}
          name={"indicatorByEvent"}
          color="blue"
          onclick={() => {
            onPanelClick(3);
          }}
        />
        <HorizontalBarsPanel
          title={t("card.title.4")}
          name={"indicatorByCountry"}
          color="blue"
          onclick={onPanelClick}
        />
        <HorizontalBarsPanel
          title={t("card.title.5")}
          name={"indicatorByDivision"}
          color="blue"
          onclick={onPanelClick}
        />
        <HorizontalBarsPanel
          title={t("card.title.6")}
          name={"indicatorByStatus"}
          color="blue"
          onclick={onPanelClick}
        />
        <HorizontalBarsPanel
          title={t("card.title.7")}
          name={"indicatorByBuyer"}
          color="blue"
          onclick={onPanelClick}
        />
        <HorizontalBarsPanel
          title={t("card.title.8")}
          name={"indicatorByDepartment"}
          color="blue"
          onclick={onPanelClick}
        />
        <HorizontalBarsPanel
          title={t("card.title.9")}
          name={"indicatorBySprint"}
          color="blue"
          onclick={onPanelClick}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Importations;
