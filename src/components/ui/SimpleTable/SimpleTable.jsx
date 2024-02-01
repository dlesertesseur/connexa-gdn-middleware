/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Image, Table, Text, UnstyledButton } from "@mantine/core";
import { useEffect, useState } from "react";

const SimpleTable = ({ columns, data }) => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    const rows = createRows();
    setRows(rows);
  }, [data]);

  function convertMilisegToYYYYMMDD(milisegundos) {
    const fecha = new Date(milisegundos);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }

  const createRow = (item) => {
    const fields = [];
    columns.forEach((c) => {
      switch (c.type) {
        case "image":
          fields.push(
            <Table.Td key={item.id}>
              <UnstyledButton
                onClick={() => {
                  c.onClick ? c.onClick(item) : null;
                }}
              >
                <Image src={item[c.field]} h={32} w={"auto"} alt=""></Image>
              </UnstyledButton>
            </Table.Td>
          );
          break;

        case "money":
          fields.push(<Table.Td>{item[c.field]}</Table.Td>);
          break;

        case "timestampToYYYYMMDD":
          fields.push(<Table.Td>{convertMilisegToYYYYMMDD(item[c.field])}</Table.Td>);
          break;

        case "link":
          fields.push(
            <Table.Td key={item.id}>
              <UnstyledButton
                onClick={() => {
                  c.onClick ? c.onClick(item) : null;
                }}
              >
                <Text fw={600} size="md" c={"blue"}>
                  {item[c.field]}
                </Text>
              </UnstyledButton>
            </Table.Td>
          );
          break;

        default:
          fields.push(<Table.Td>{item[c.field]}</Table.Td>);
          break;
      }
    });

    const ret = <Table.Tr>{fields}</Table.Tr>;

    return ret;
  };

  const createRows = () => {
    const rows = [];
    data.forEach((item) => {
      rows.push(createRow(item));
    });

    return rows;
  };

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead bg={"gray.2"}>
        <Table.Tr>
          {columns.map((c) => {
            return <Table.Th key={c.field}>{c.label}</Table.Th>;
          })}
        </Table.Tr>
      </Table.Thead>
      {rows ? <Table.Tbody>{rows}</Table.Tbody> : null}
    </Table>
  );
};

export default SimpleTable;
