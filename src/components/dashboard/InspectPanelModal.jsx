/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Modal } from "@mantine/core";
import ShipmentPanel from "./ShipmentPanel";
import TotalsPanel from "./TotalsPanel";
import { useViewportSize } from "@mantine/hooks";

const InspectPanelModal = ({ opened, close, panel }) => {
  const { height } = useViewportSize();
  
  function createBody() {
    let component = null;

    switch (panel.name) {
      case "indicatorByScheduleCompliance":
        component = <ShipmentPanel panel={panel} height={height}/>
        break;
    
      default:
        component = <TotalsPanel panel={panel} height={height}/>
        break;
    }
    return(component);
  } 

  return (
    <Modal.Root opened={opened} onClose={close} size={"100%"} h={"100%"} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{panel.title}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>{height ? createBody() : null}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default InspectPanelModal;
