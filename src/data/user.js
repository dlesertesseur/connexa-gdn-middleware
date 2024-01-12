import { API_GDNAR } from "./config";

export async function getUserById(params) {
  const apiUrl = `${API_GDNAR}/users/${params.id}`;

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
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

export async function getAllUsers(params) {
  const apiUrl = `${API_GDNAR}/users/unpaged`;

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
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

export async function getAllRoles(params) {
  const apiUrl = `${API_GDNAR}/roles/unpaged`;

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
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

export async function getRolesByUserId(params) {
  const apiUrl = `${API_GDNAR}/relation-user-role/user/${params.id}`;

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
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

export async function createUser(params) {
  const apiUrl = `${API_GDNAR}/users`;

  const body = JSON.stringify({
    username: params.user.email,
    lastname: params.user.lastname,
    firstname: params.user.firstname,
    password: params.user.initialPassword,
    sidomkey: params.user.sidomkey,
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

export async function updateUser(params) {
  const apiUrl = `${API_GDNAR}/users`;

  const body = JSON.stringify({
    id: params.userId,
    username: params.values.email,
    lastname: params.values.lastname,
    firstname: params.values.firstname,
    sidomkey: params.values.sidomkey,
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

export async function removeUser(params) {
  const apiUrl = `${API_GDNAR}/users/${params.id}`;

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

export async function addRoleToUser(params) {
  const apiUrl = `${API_GDNAR}/relation-user-role`;

  const body = JSON.stringify({
    userId: params.userId,
    roleId: params.roleId,
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

export async function removeRoleFromUser(params) {
  const apiUrl = `${API_GDNAR}/relation-user-role/user/${params.userId}/role/${params.roleId}`;

  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const res = await fetch(apiUrl, requestOptions);
  let data = null;

  if (res.status !== 200) {
    throw new Error(`${res.status}`);
  }

  return data;
}
