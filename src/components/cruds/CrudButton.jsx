/* eslint-disable react/prop-types */

import { Button, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";

const CrudButton = ({ mode }) => {
  const { t } = useTranslation();
  
  function getModeButtonLabel() {
    const ret = t(`general.button.${mode}`);
    return ret;
  }

  function getModeButtonColor() {
    const ret = t(`general.button.color.${mode}`);
    return ret;
  }
  return (
    <Group w={"100%"} mt={"lg"} justify="flex-end">
      <Button type="submit" color={getModeButtonColor()}>
        {getModeButtonLabel()}
      </Button>
    </Group>
  );
};

export default CrudButton;
