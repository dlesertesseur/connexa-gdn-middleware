import { API_GDNAR } from "./config";

const baseUrl = API_GDNAR;

async function findAllShipments(params) {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: params.token,
      },
    };

    const url = `${baseUrl}/shipments`;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function findAllShipmentStatuses(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/shipments/statuses`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findShipmentsByStatus(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };
  const event = params.event ? `&event=${params.event}` : null;
  const analyst = params.analyst ? `&analyst=${params.analyst}` : null;
  const buyer = params.buyer ? `&buyer=${params.buyer}` : null;
  const year = params.year ? `&year=${params.year}` : null;

  const url = `${baseUrl}/shipments/new?status=${params.status}${event ? event : ""}${analyst ? analyst : ""}${buyer ? buyer : ""}${year ? year : ""}`;
  // console.log("findShipmentsByStatus url -> ", url);

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}

async function findShipmentStatusCount(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const event = params.event ? `&event=${params.event}` : null;
  const analyst = params.analyst ? `&analyst=${params.analyst}` : null;
  const buyer = params.buyer ? `&buyer=${params.buyer}` : null;
  const year = params.year ? `&year=${params.year}` : null;

  const url = `${baseUrl}/shipments/count/new?status=${params.status}${event ? event : ""}${analyst ? analyst : ""}${buyer ? buyer : ""}${year ? year : ""}`;

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findShipmentsIndicatorsByStatus(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const event = params.event ? `&event=${params.event}` : null;
  const analyst = params.analyst ? `&analyst=${params.analyst}` : null;
  const buyer = params.buyer ? `&buyer=${params.buyer}` : null;
  const year = params.year ? `&year=${params.year}` : null;

  const url = `${baseUrl}/shipments/indicators/new?status=${params.status}${event ? event : ""}${analyst ? analyst : ""}${buyer ? buyer : ""}${year ? year : ""}`;
  
  const res = await fetch(url, requestOptions);
  const data = await res.json();

  return data;
}

async function getProcessStatus(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/process-control`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}

async function findAllBusinessObjectives(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/shipments/events`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findAllAnalysts(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/shipments/analists`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findAllBuyers(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/shipments/buyers`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findShipmentsItemsByReference(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/shipments/items?reference=${params.reference}`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findShipmentsByReference(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };
  const url = `${baseUrl}/shipments/${params.reference}`;

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}

async function findAllYears(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };

  const url = `${baseUrl}/shipments/years`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function markShipmentAsModied(params) {
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
  };
  const url = `${baseUrl}/shipments?reference=${params.reference}`;

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}


export {
  getProcessStatus,
  findAllShipments,
  findAllShipmentStatuses,
  findShipmentsByStatus,
  findShipmentStatusCount,
  findShipmentsIndicatorsByStatus,
  findAllBusinessObjectives,
  findAllAnalysts,
  findAllBuyers,
  findShipmentsItemsByReference,
  findShipmentsByReference,
  findAllYears,
  markShipmentAsModied,
};
