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

  const url = `${API_GDNAR}/vessels/${params.code}`;
  console.log("findVesselByCode url ->", url);

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export { findVesselByCode };
