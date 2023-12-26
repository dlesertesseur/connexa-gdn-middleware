/* eslint-disable react/prop-types */
import { Group, Text } from "@mantine/core";
import { IconCurrencyDollar, IconCurrencyEuro, IconCurrencyYuan } from "@tabler/icons-react";

const ImportationCurrencyValue = ({ currency, value }) => {
  const getIcon = (currency) => {
    let ret = null;
    switch (currency) {
      case "DOL":
        ret = <IconCurrencyDollar size={16} />;
        break;
      case "EUR":
        ret = <IconCurrencyEuro size={16} />;
        break;
      case "CNY":
        ret = <IconCurrencyYuan size={16} />;
        break;
    }
    return ret;
  };

  const getValue = (value) => {
    const numberFormat = new Intl.NumberFormat("es", {
      maximumFractionDigits: 0,
    });

    const ret = numberFormat.format(value);
    return ret;
  };

  return (
    <Group w={"100%"} justify="space-between" spacing={0} align="center">
      <Group spacing={0} justify="space-between">
        <Text size={"xs"} weight={600} align="center">
          {currency ? currency : "---"}
        </Text>
        {getIcon(currency)}
      </Group>

      <Text size={"md"} weight={600} align="center">
        {getValue(value)}
      </Text>
    </Group>
  );
};

export default ImportationCurrencyValue;
