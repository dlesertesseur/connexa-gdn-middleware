import { config } from "@/app/config";

export async function signin(parameters) {
  const apiUrl = `${config.API_SERVER}:${config.API_PORT}${config.ADMIN_BASE}/authentication`;
  
  const body = JSON.stringify({
    email: parameters.email,
    password: parameters.password,
  });

  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
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
