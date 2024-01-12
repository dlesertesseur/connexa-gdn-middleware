import { API_GDNAR } from "./config";

export async function getAllEvents(params) {
  const apiUrl = `${API_GDNAR}/events/unpaged`;

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

export async function createEvent(params) {
  const apiUrl = `${API_GDNAR}/events`;

  const body = JSON.stringify({
    name: params.values.name,
    description: params.values.description,
    sidomkeys: params.values.sidomkeys,
    startDateTime: params.values.startDateTime,
    endDateTime: params.values.endDateTime,
  });

  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
    body: body,
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

export async function updateEvent(params) {
  const apiUrl = `${API_GDNAR}/events`;

  const body = JSON.stringify({
    id: params.id,
    name: params.values.name,
    description: params.values.description,
    sidomkeys: params.values.sidomkeys,
    startDateTime: params.values.startDateTime,
    endDateTime: params.values.endDateTime
  });

  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
    body: body,
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

export async function removeEvent(params) {
  const apiUrl = `${API_GDNAR}/events/${params.id}`;

  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const res = await fetch(apiUrl, requestOptions);

  if (res.status !== 200) {
    throw new Error(`${res.status}`);
  }
}