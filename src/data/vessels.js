import { API_GDNAR } from "./config";

async function findVesselByCode(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:params.token
    },
  };

  //const url = `${API_GDNAR}/vessels/${params.code}`;
  const url = `http://192.168.0.10:8085/api/solicitar/${params.name}`
  
  console.log("findVesselByCode url ->", url);

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export { findVesselByCode };
