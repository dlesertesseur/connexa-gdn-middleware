/* eslint-disable react/prop-types */
import * as XLSX from "xlsx";
import { Button, Group, Text } from "@mantine/core";
import { IconFileExport } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import { notifications } from "@mantine/notifications";
import { convertMilisegToYYYYMMDD } from "../../utils/utils";

const ExportXlsButton = ({ fileName, sheetName, data, columns }) => {
  const { t } = useTranslation();

  const onExport = () => {
    let dataToExport = null;
    if(columns){
      dataToExport = formatData(data);
    }else{
      dataToExport = data;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
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
      color: "green",
      withCloseButton: false,
      autoClose: 3000,
    });
  };

  function formatData(data) {
    const dataFormated = [];

    for (let index = 0; index < data.length; index++) {
      const row = data[index];
      const formatedRow = formatRow(row, columns);
      dataFormated.push(formatedRow);
    }

    return(dataFormated)
  }

  function formatMumber(value, locale) {
    const ret = value.toLocaleString(locale, { minimumFractionDigits: 2 });
    return ret;
  }

  function convertStrToFloat(value, format, defaultValue) {
    let n = defaultValue ? defaultValue : "0";
    if (value) {
      const ret = parseFloat(value);
      n = formatMumber(ret, format);
    }
    return n;
  }

  function formatRow(row, columns) {
    const ret = {};
    for (let index = 0; index < columns.length; index++) {
      const col = columns[index];
      const value = createCellValue(col.type, col.format, col.defaultValue, row[col.field]);
      ret[col.label] = value;
    }
    
    return(ret);
  }

  const createCellValue = (type, format, defaultValue, value) => {
    let ret = null;
    switch (type) {
      case "timestampToYYYYMMDD":
        ret = convertMilisegToYYYYMMDD(value);
        break;

      case "strToFloat":
        ret = convertStrToFloat(value, format);
        break;

      case "number":
        ret = !value ? formatMumber(value, format) : null;
        break;

      default:
        ret = value ? value : defaultValue;
        break;
    }
    return ret;
  };

  return (
    <Group gap={"xs"} wrap="nowrap">
      <Button
        onClick={onExport}
        size="xs"
        leftSection={<IconFileExport size={16} />}
        disabled={data && fileName ? false : true}
      >
        <Text size="xs">{t("general.button.exportXls")}</Text>
      </Button>
    </Group>
  );
};

export default ExportXlsButton;
