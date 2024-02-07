import { API_GDNAR } from "./config";

const baseUrl = API_GDNAR;

async function getAllDocuments(params) {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: params.token,
      },
    };

    const url = `${baseUrl}/documents?analyst=${params.sidomkeys}`;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    const l = data.map((d) => {
      const ret = {...d};
      ret.document.valor = Number(ret.document.valor);
      ret.document.fob = Number(ret.document.fob);
      return ret;
    });

    return l;
  } catch (error) {
    return error;
  }
}

async function getDocumentById(params) {
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
      token: params.token,
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
      token: params.token,
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
      token: params.token,
    },
  };

  const url = `${baseUrl}/documents/${params.reference}`;

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}

async function assignBuyer(params) {
  const apiUrl = `${API_GDNAR}/documents`;

  const body = JSON.stringify({
    buyerName: params.buyerName,
    documentReference: params.documentReference,
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

async function unassignBuyer(params) {
  const apiUrl = `${API_GDNAR}/documents/${params.id}`;

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

export {
  findDocumentByReference,
  findItemsByDocument,
  getAllDocuments,
  findAsociateShipmentsByDocument,
  getDocumentById,
  assignBuyer,
  unassignBuyer,
};
