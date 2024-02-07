/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button, Group, Image, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

const fwText = 400;
function convertMilisegToYYYYMMDD(milisegundos) {
  const fecha = new Date(milisegundos);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

function convertStrToFloat(value, format, defaultValue) {
  let n = defaultValue ? defaultValue : "0";
  if(value){
    const ret = parseFloat(value);
    n = formatMumber(ret, format);
  }
  return(n);
}

function formatMumber(value, locale){
  // const formatter = new Intl.NumberFormat(locale ? locale : "es-ES", {minimumFractionDigits: 2});
  // const ret = formatter.format(value);
  const ret = value.toLocaleString(locale, {minimumFractionDigits: 2})
  return(ret);
}

const Cell = ({
  value,
  w,
  align,
  order,
  type,
  format,
  action,
  selected,
  lastColumn,
  defaultValue = "",
  iconOn,
  iconOff,
}) => {
  const createCellValue = (type, value) => {
    let ret = null;
    switch (type) {
      case "led":
        ret =
          value !== "GREEN" ? (
            <Group gap={0} h={"100%"} w={w} justify="center" align="center">
              <IconPencil size={16} />
            </Group>
          ) : null;

        break;
      case "image":
        ret = <Image src={value} h={32} w={"auto"} alt=""></Image>;
        break;

      case "timestampToYYYYMMDD":
        ret = (
          <Text fw={fwText} size="sm" truncate="end">
            {convertMilisegToYYYYMMDD(value)}
          </Text>
        );
        break;

      case "strToFloat":
        ret = (
          <Text fw={fwText} size="sm" truncate="end">
            {convertStrToFloat(value, format)}
          </Text>
        );
        break;

      case "linkButton":
        ret = (
          <Button
            w={"100%"}
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              action(value);
            }}
          >
            <Text fw={fwText} size="sm">
              {value}
            </Text>
          </Button>
        );
        break;

      case "icon":
        ret = (
          <Group gap={0} h={"100%"} w={w} justify="center" align="center">
            {value ? iconOn : iconOff}
          </Group>
        );

        break;

      case "number":
        ret = !value ? (
          <Text fw={fwText} size="sm">
            {formatMumber(value, format)}
          </Text>
        ) : null;
        break;

      default:
        ret = (
          <Text fw={fwText} size="sm" truncate="end">
            {value ? value : defaultValue}
          </Text>
        );
        break;
    }
    return ret;
  };

  return (
    <Group
      p={3}
      py={6}
      w={w}
      h={"100%"}
      justify={align}
      align="flex-start"
      style={!lastColumn ? { borderRight: "1px solid #C5C5C5" } : null}
    >
      {createCellValue(type, value)}
    </Group>
  );
};

export default Cell;
