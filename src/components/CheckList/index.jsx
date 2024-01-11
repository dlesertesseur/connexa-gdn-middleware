/* eslint-disable react/prop-types */
import { Checkbox, Group, Stack, Table, Text } from "@mantine/core";

const CheckList = ({ label, h, w, data, onCheck, disabled }) => {
  return (
    <Stack h={h} w={w} gap={5}>
      <Group >
        <Text size="sm" fw={500}>
          {label}
        </Text>
      </Group>

        <Table withTableBorder highlightOnHover={!disabled}>
          <Table.Tbody>
            {data?.map((r) => {
              let ret = (
                <Table.Tr key={r.id}>
                  <Table.Td>
                    <Checkbox
                      disabled={disabled}
                      label={r.name}
                      checked={r.checked}
                      onChange={(event) => onCheck(r.id, event.currentTarget.checked)}
                    />
                  </Table.Td>
                </Table.Tr>
              );
              return ret;
            })}
          </Table.Tbody>
        </Table>
    </Stack>
  );
};

export default CheckList;
