/* eslint-disable react/prop-types */
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

export function VesselCard({ data }) {
  const { t } = useTranslation();
  return (
    <Card w={300}>
      <Card.Section>
        <Image src={data.image ? data.image : "https://picsum.photos/300/300"} alt={data.code} height={200} />
      </Card.Section>

      <Card.Section>
        <Group justify="space-between">
          <Text>{data.name}</Text>
          <Badge size="sm" variant="light">
            {data.flag}
          </Badge>
        </Group>
        <Text>{data.type}</Text>
      </Card.Section>

      <Card.Section>
        <Group grow>
          <Button>{t("general.button.moreInfo")}</Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
