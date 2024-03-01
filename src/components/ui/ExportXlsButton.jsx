/* eslint-disable react/prop-types */
import * as XLSX from "xlsx";
import { Button, Group, Text } from "@mantine/core";
import { IconFileExport } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import { notifications } from "@mantine/notifications";

const ExportXlsButton = ({fileName, sheetName, data}) => {
  const { t } = useTranslation();

  const onExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ? sheetName : fileName);

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `${fileName}.xlsx`);

    notifications.show({
      title: t("general.title.export"),
      message: t("general.message.exportSuccess"),
      color:"green",
      withCloseButton: false,
      autoClose:3000
    })
  };

  return (
    <Group gap={"xs"} wrap="nowrap">
      <Button onClick={onExport} size="xs" leftSection={<IconFileExport size={16} />} disabled={(data && fileName) ? false : true}>
        <Text size="xs">{t("general.button.exportXls")}</Text>
      </Button>
    </Group>
  );
};

export default ExportXlsButton;
