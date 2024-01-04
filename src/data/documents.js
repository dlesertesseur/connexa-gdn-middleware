import { API_GDNAR } from "./config";

const baseUrl = API_GDNAR;

async function findAllDocuments(params) {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: params.token,
      },
    };

    const url = `${baseUrl}/documents`;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function findItemsByDocument(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      apikey: params.token,
    },
  };

  const url = `${baseUrl}/documents/${params.reference}/items`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}


async function findAsociateShipmentsByDocument(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      apikey: params.token,
    },
  };

  const url = `${baseUrl}/shipments/po/${params.reference}`;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function findDocumentByReference(params) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      apikey: params.token,
    },
  };

  const url = `${baseUrl}/documents/${params.reference}`;

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}

export { findDocumentByReference, findItemsByDocument, findAllDocuments, findAsociateShipmentsByDocument };
