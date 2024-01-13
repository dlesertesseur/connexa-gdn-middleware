import { Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const AppTitle = () => {
  const { t } = useTranslation();
  return (
    <Title order={2} >
      {t("general.appTitle")}
    </Title>
  );
};

export default AppTitle;
