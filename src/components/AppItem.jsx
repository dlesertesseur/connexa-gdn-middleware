import { Grid, Group, Paper, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
const AppItem = ({ id, name, description, href, selected, setSelected }) => {
  const navigate = useNavigate();
  return (
    <UnstyledButton
      onClick={() => {
        setSelected(id);
        navigate(href, {options:{replace: true}});
      }}
    >
      <Paper
        p={6}
        radius={"md"}
        
        w={266}
        bg={selected ? "blue" : "gray.1"}
      >
        <Grid align="center" gutter={0}>
          <Grid.Col span="auto">
            <Stack m={0} align="stretch" gap={"xs"}>
              <Text size="md" fw={700} c={selected ? "white" : "dark"}>
                {name}
              </Text>
              <Text size="xs" truncate={false} c={selected ? "gray.1" : "gray.6"}>
                {description}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Group justify="flex-end">
              <IconChevronRight color={selected ? "white" : "dark"} size={16} />
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </UnstyledButton>
  );
};

export default AppItem;
