/* eslint-disable react/prop-types */
import { Button, Group, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { HEADER_HIGHT } from "../../data/config";
import Iframe from "react-iframe";

const SidomPortal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { height } = useViewportSize();

  const { status, reference } = location.state;
  return (
    <Stack spacing={"xs"}>
      <Group justify="space-between">
        <Group gap={0} wrap="nowrap">
          <Text size={"md"} weight={600}>
            {`${status} / ${reference}`}
          </Text>
        </Group>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          size="xs"
        >
          <Text size="xs">{t("general.button.back")}</Text>
        </Button>
      </Group>

      {/* <> */}
      {/* <Helmet>
          <meta charSet="utf-8" />
          <title>Sidom</title>
          <meta httpEquiv="X-Frame-Options" content="sameorigin"></meta>
        </Helmet> */}

      <Iframe
        url="https://www.google.com"
        frameBorder={0}
        sandbox={["allow-scripts", "allow-forms", "allow-modals", "allow-same-origin"]}
        width="100%"
        height={`${height - HEADER_HIGHT} px`}
        id=""
        className=""
        display="block"
        position="relative"
      />
      {/* </> */}
    </Stack>
  );
};

export default SidomPortal;
