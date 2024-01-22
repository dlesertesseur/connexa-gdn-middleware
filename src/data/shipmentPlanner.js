import { API_GDNAR } from "./config";

export async function getAllShipmentPlanBySidomkeys(params) {
  const apiUrl = `${API_GDNAR}/shipment-plan/${params.sidomkeys}`;

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

export async function getAllBusinessObjectivesBySidomkeys(params) {
  const apiUrl = `${API_GDNAR}/events/sidom/${params.sidomkeys}`;

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

export async function createShipmentPlan(params) {
  const apiUrl = `${API_GDNAR}/shipment-plan`;

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

export async function updateShipmentPlan(params) {
  const apiUrl = `${API_GDNAR}/shipment-plan`;

  const body = JSON.stringify(params.body);

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

  if (res.status !== 200) {
    throw new Error(`${res.status}`);
  }

  return data;
}

export async function removeShipmentPlan(params) {
  const apiUrl = `${API_GDNAR}/shipment-plan/${params.id}`;

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

export async function getShipmentPlanByEvent(params) {
  const apiUrl = `${API_GDNAR}/shipment-plan/events/${params.id}`;

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