/* eslint-disable react-hooks/exhaustive-deps */

import MasterPlanProvider from "../../context/MasterPlanContext";
import MasterPlanPanel from "./MasterPlanPanel";

const Masterplan = () => {
  return (
    <MasterPlanProvider>
      <MasterPlanPanel />
    </MasterPlanProvider>
  );
};

export default Masterplan;
