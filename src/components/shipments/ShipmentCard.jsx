/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Card, Group, Skeleton, Stack, Text, UnstyledButton } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useShipmentContext } from "../../context/ShipmentContext";
import ShipmentTotalValue from "./ShipmentTotalValue";
import ShipmentPartialValue from "./ShipmentPartialValue";

const ShipmentCard = ({ status }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [totals, setTotals] = useState(null);
  const { totalsByStatus, selectStatus, loadingTotalsData } = useShipmentContext();

  useEffect(() => {
    if (totalsByStatus) {
      const totals = totalsByStatus.get(status);
      setTotals(totals);
    }
  }, [totalsByStatus, status]);

  return (
    <UnstyledButton
      onClick={() => {
        const params = {
          options: {
            replace: true,
          },
        };
        selectStatus(status);
        navigate("shipmentStatusDetail", params);
      }}
    >
      <Card shadow={"0px"} padding="lg" radius="md" withBorder w={"400px"}>
        <Stack align="center">
          <Group justify="center" align="center">
            <Text size={"xl"} fw={600} align="center">
              {status}
            </Text>
          </Group>

          {totals?.count > -1 && !loadingTotalsData ? (
            <Group justify="space-between" w={"100%"}>
              <Group align="center">
                <ShipmentTotalValue value={totals?.count} />
              </Group>

                {/* <Stack spacing={0} h={100}>
                  {totals?.partials?.values?.map((v) => {
                    if (v.amount > 0) {
                      return (
                        <ShipmentCurrencyValue key={v.currency} currency={v.currency} value={Math.round(v.amount)} />
                      );
                    } else {
                      return null;
                    }
                  })}
                </Stack> */}
            </Group>
          ) : (
            <Group justify="center" align="center" h={"60%"}>
              <Skeleton height={100} w={160} radius={"md"} mb="xl" />
              <Skeleton height={100} w={160} radius={"md"} mb="xl" />
            </Group>
          )}

          {totals?.partials && !loadingTotalsData ? (
            <Group grow justify="center" align="center" w={"100%"} spacing={"xs"}>
              <ShipmentPartialValue
                title={t("shipments.label.feus")}
                value={Math.round(totals?.partials.feus * 10) / 10}
              />
              <ShipmentPartialValue
                title={t("shipments.label.notRegistered")}
                value={totals?.partials.withoutDateCount}
              />
              <ShipmentPartialValue
                title={t("shipments.label.onTime")}
                value={totals?.partials.dateInTheFutureCount}
              />
              <ShipmentPartialValue
                title={t("shipments.label.outOfDate")}
                value={totals?.partials.dateInThePastCount}
                color={"red"}
              />
            </Group>
          ) : (
            <Group justify="center" align="center" w={"100%"} spacing={"xs"}>
              <Skeleton height={50} w={50} mb="md" radius={"md"} />
              <Skeleton height={50} w={50} mb="md" radius={"md"} />
              <Skeleton height={50} w={50} mb="md" radius={"md"} />
              <Skeleton height={50} w={50} mb="md" radius={"md"} />
            </Group>
          )}
        </Stack>
      </Card>
    </UnstyledButton>
  );
};

export default ShipmentCard;
