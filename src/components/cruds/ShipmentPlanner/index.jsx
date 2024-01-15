import { useEffect } from 'react';
import { useShipmentPlannerContext } from '../../../context/ShipmentPlannerContext';
import { Outlet } from 'react-router-dom';

const ShipmentPlanner = () => {
    const { initData } = useShipmentPlannerContext();
  
    useEffect(() => {
      initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return <Outlet />;
}

export default ShipmentPlanner