import { Outlet } from "react-router-dom";
import EventProvider from "../../../context/EventContext";

const EventCrud = () => {
  return (
    <EventProvider>
      <Outlet />
    </EventProvider>
  );
};

export default EventCrud;
