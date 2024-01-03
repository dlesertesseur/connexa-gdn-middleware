/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button, Group, Image, Text } from "@mantine/core";

const lpad = function (s, width, char) {
  return s.length >= width ? s : (new Array(width).join(char) + s).slice(-width);
};

function convertMilisegToYYYYMMDDHHMISS(milisegundos) {
  const fecha = new Date(milisegundos);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  const hours = String(fecha.getHours()).padStart(2, "0");
  const minutes = String(fecha.getMinutes()).padStart(2, "0");
  const seconds = String(fecha.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function convertMilisegToYYYYMMDD(milisegundos) {
  const fecha = new Date(milisegundos);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

function convertStrToFloat(value) {
  const ret = parseFloat(value);
  return ret.toFixed(2);
}

const Cell = ({ value, w, align, order, type, action, selected, lastColumn, defaultValue="" }) => {
  const createCellValue = (type, value) => {
    let ret = null;
    switch (type) {
      case "image":
        ret = <Image src={value} h={32} w={"auto"} alt=""></Image>;
        break;

      case "timestampToYYYYMMDD":
        ret = (
          <Text fw={500} truncate="end">
            {convertMilisegToYYYYMMDD(value)}
          </Text>
        );
        break;

      case "strToFloat":
        ret = (
          <Text fw={500} truncate="end">
            {convertStrToFloat(value)}
          </Text>
        );
        break;

      case "linkButton":
        ret = (
          <Button w={"100%"} size="xs" onClick={(e) => {
            e.stopPropagation();
            action(value)
            }}>
            <Text fw={400} size="sm">{value}</Text>
          </Button>
        );
        break;

      default:
        ret = (
          <Text fw={500} truncate="end">
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
