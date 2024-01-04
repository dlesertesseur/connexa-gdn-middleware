import { Alert, Group, ScrollArea, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import { useShipmentContext } from "../../context/ShipmentContext";
import { useTranslation } from "react-i18next";
import { findShipmentsByReference } from "../../data/shipments";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import ShipmentDetailToolbar from "./ShipmentDetailToolbar";

const ShipmentDetail = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { height } = useViewportSize();

  const { statusSelected } = useShipmentContext();
  const { user } = useUserContext();
  const { reference } = location.state;
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fields = t("shipment.detail.fields", { returnObjects: true });

  const getData = async () => {
    const params = {
      token: user.token,
      reference: reference,
    };

    try {
      setLoading(true);
      const data = await findShipmentsByReference(params);
      setLoading(false);

      if (data.message) {
        setError(data.message);
      } else {
        const values = fields.map((e) => {
          const ret = { label: t(`shipment.detail.label.${e}`), value: data[e] };
          return ret;
        });
        setValues(values);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (reference) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  return (
    <Stack gap={"xs"}>
      <ShipmentDetailToolbar disabled={loading} statusSelected={statusSelected} reference={reference} />

      <Title order={4}>{t("shipment.title")}</Title>
      {error ? (
        <Group justify="center">
          <Alert
            miw={300}
            maw={400}
            variant="light"
            color="red"
            withCloseButton
            title={t("general.title.error")}
            icon={<IconAlertOctagonFilled size={24} />}
          >
            <Text size="sm" c={"red"}>
              {error}
            </Text>
          </Alert>
        </Group>
      ) : (
        <ScrollArea mt={"xs"} h={height - 170} offsetScrollbars>
          {values ? (
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Tbody>
                {values?.map((v) => {
                  const ret = (
                    <Table.Tr key={v.label}>
                      <Table.Td>{v.label}</Table.Td>
                      <Table.Td>{v.value}</Table.Td>
                    </Table.Tr>
                  );
                  return ret;
                })}
              </Table.Tbody>
            </Table>
          ) : (
            <Skeleton height={64} radius={"md"} />
          )}
        </ScrollArea>
      )}
    </Stack>
  );
};

export default ShipmentDetail;
