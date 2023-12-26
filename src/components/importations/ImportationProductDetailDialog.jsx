/* eslint-disable react/prop-types */
import { Badge, Card, Group, Image, Modal, Text } from "@mantine/core";

const ImportationProductDetailDialog = ({ title, open, setOpen, product }) => {
  return (
    <Modal
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
      title={title}
      centered
    >
      <Card >
        <Card.Section>
          <Image
            src={`${product?.image}`}
            alt={product?.upc}
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text weight={500}>{product?.descripcion}</Text>
          <Badge color="pink" variant="light">
          {product?.tipo}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
        {product?.upc}
        </Text>
      </Card>
    </Modal>
  );
};

export default ImportationProductDetailDialog;
