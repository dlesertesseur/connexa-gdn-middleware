import { API_GDN } from "./config";

async function findAllBusinessGoals(params) {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: params.token,
      },
    };
  
    const url = `${API_GDN}/business-goals`;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  }

  export {findAllBusinessGoals}