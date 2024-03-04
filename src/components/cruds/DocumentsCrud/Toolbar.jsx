/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../context/AppContext";
import { useEffect, useState } from "react";
import ExportXlsButton from "../../ui/ExportXlsButton";

const Toolbar = ({ rowSelected, onViewDetail, exportData=false, columns, data, fileName, sheetName }) => {
  const { t } = useTranslation();
  const { activeApp } = useAppContext();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const app = activeApp();
    setApp(app);
  }, []);

  // const onUpdate = () => {
  //   open();
  // };

  // const onDelete = () => {
  //   confirm();
  // };

  return (
    <Group justify="space-between">
      <Group gap={0} wrap="nowrap">
        <Title size={"h5"}>{app?.name}</Title>
      </Group>
      <Group gap={"xs"} wrap="nowrap">
        <Button
          onClick={() => {
            onViewDetail(rowSelected);
          }}
          disabled={rowSelected ? false : true}
          size="xs"
        >
          <Text size="xs">{t("general.button.viewDetail")}</Text>
        </Button>

        {exportData ? (
          <ExportXlsButton data={data} fileName={fileName} sheetName={sheetName ? sheetName : fileName} columns={columns}/>
        ) : null}
      </Group>
    </Group>
  );
};

export default Toolbar;
