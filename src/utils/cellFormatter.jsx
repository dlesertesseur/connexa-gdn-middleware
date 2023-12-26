import { Avatar } from "@mantine/core";
import { BASE_IMAGE_URl } from "../data/config";

const formatImage = (cell) => {
  const imgUrl = cell.getData().image;
  console.log("cell img ->",imgUrl);
  const ret = cell ? <img src={imgUrl} alt={""} width={48} /> : null;
  return ret;
};

const avatarImage = (data) => {
  const ret = data ? (
    <Avatar radius={36} src={`${BASE_IMAGE_URl}${data.getData()}`} alt={"Not found"} height={24} fit="contain" />
  ) : null;
  return ret;
};

export { formatImage, avatarImage };
