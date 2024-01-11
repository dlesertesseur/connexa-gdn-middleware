import { API_GDNAR } from "./config";

export async function getAllEvents(params) {
  const apiUrl = `${API_GDNAR}/events`;

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token
    },
  };

  const res = await fetch(apiUrl, requestOptions);
  let data = null;

  if (res.status === 200) {
    data = await res.json();
  } else {
    throw new Error(`${res.status}`);
  }

  return data;
}

export async function getEventById(params) {
  const apiUrl = `${API_GDNAR}/events/${params.id}`;

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token
    },
  };

  const res = await fetch(apiUrl, requestOptions);
  let data = null;

  if (res.status === 200) {
    data = await res.json();
  } else {
    throw new Error(`${res.status}`);
  }

  return data;
}
