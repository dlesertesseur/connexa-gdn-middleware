import { config } from "@/app/config";

export async function getUserById(id, token) {
  const apiUrl = `${config.API_SERVER}:${config.API_PORT}${config.ADMIN_BASE}/users/${id}`;
  
console.log("getUserById(id, token) -> ", id, token);

  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "token": token
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
