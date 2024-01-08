/* eslint-disable no-undef */
const config = {
  SERVER: import.meta.env.VITE_SERVER,
  PORT: import.meta.env.VITE_PORT,
  API_ADMIN_BASE: import.meta.env.VITE_API_ADMIN_BASE,
  API_GDNAR_BASE: import.meta.env.VITE_API_GDNAR_BASE,
  APP_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  SIDOM_URL: import.meta.env.VITE_SIDOM_URL
};

function getSidomShipmentUrl(ipda, ipie, despacho){
  const str =`${config.SIDOM_URL}ipda=${ipda}&ipie=${ipie}&despacho=${despacho}`
  return(str); 
}

const API_ADMIN = `${config.SERVER}:${config.PORT}${config.API_ADMIN_BASE}`;
const API_GDNAR = `${config.SERVER}:${config.PORT}${config.API_GDNAR_BASE}`;
const BASE_IMAGE_URl = `${config.SERVER}:${config.PORT}`;
const MODULE_APPS_ROOT=`${config.APP_PUBLIC_URL}`;
const HEADER_HIGHT = 144
export { config, API_ADMIN, API_GDNAR, MODULE_APPS_ROOT, HEADER_HIGHT, BASE_IMAGE_URl, getSidomShipmentUrl};
