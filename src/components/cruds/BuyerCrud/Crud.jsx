import DeckPanel from "../../ui/DeckPanel";
import BuyerList from "./BuyerList";
import BuyerPanel from "./BuyerPanel";
import { useBuyerCrudContext } from "../../../context/BuyerCrudContext";

const Crud = () => {
  const {activeComponent} = useBuyerCrudContext();
  return (
    <DeckPanel activeComponent={activeComponent}>
      <BuyerList key={"list"} />
      <BuyerPanel key={"create"} mode={"create"} />
      <BuyerPanel key={"update"} mode={"update"} />
      <BuyerPanel key={"delete"} mode={"delete"} />
    </DeckPanel>
  );
};

export default Crud;
