import { Outlet } from "react-router-dom";
import EventCrudProvider from "../../../context/EventCrudContext";

const EventCrud = () => {
  return (
    <EventCrudProvider>
      <Outlet />
    </EventCrudProvider>
  );
};

export default EventCrud;
