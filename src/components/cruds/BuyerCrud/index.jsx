import BuyerCrudProvider from "../../../context/BuyerCrudContext";
import Crud from "./Crud";

const BuyerCrud = () => {
  return (
    <BuyerCrudProvider>
      <Crud />
    </BuyerCrudProvider>
  );
};

export default BuyerCrud;
