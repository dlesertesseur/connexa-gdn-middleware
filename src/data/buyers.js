import { API_GDNAR } from "./config";

export async function getAllBuyers(params) {
  const apiUrl = `${API_GDNAR}/buyer/unpaged`;

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

export async function getBuyerById(params) {
  const apiUrl = `${API_GDNAR}/buyer/${params.id}`;

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

export async function createBuyer(params) {
  const apiUrl = `${API_GDNAR}/buyer`;

  const body = JSON.stringify({
    firstname: params.values.firstname,
    lastname: params.values.lastname
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

export async function updateBuyer(params) {
  const apiUrl = `${API_GDNAR}/buyer`;

  const body = JSON.stringify({
    id: params.id,
    firstname: params.values.firstname,
    lastname: params.values.lastname,
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

export async function removeBuyer(params) {
  const apiUrl = `${API_GDNAR}/buyer/${params.id}`;

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