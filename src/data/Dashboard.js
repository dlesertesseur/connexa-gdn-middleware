async function findAllChartData() {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const url = `https://connexa.vigiloo.net/api/status`;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  }

  export {findAllChartData}