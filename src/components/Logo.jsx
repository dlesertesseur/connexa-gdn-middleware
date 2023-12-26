import { Image } from "@mantine/core";
import { config } from "../data/config";

// eslint-disable-next-line react/prop-types
const Logo = ({ size = null, image = "/logo/logo.png", height = 0, width = 0 }) => {
  const url = `${config.APP_PUBLIC_URL}${image}`;

  return <Image src={url} alt="" w={size ? size : width} h={size ? size : height} />;
};

export default Logo;
