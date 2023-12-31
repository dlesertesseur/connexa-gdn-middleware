const lpad = function (s, width, char) {
  return s.length >= width ? s : (new Array(width).join(char) + s).slice(-width);
};

function convertMilisegToYYYYMMDDHHMISS(milisegundos) {
  const fecha = new Date(milisegundos);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  const hours = String(fecha.getHours()).padStart(2, "0");
  const minutes = String(fecha.getMinutes()).padStart(2, "0");
  const seconds = String(fecha.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function convertMilisegToYYYYMMDD(milisegundos) {
  const fecha = new Date(milisegundos);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export { lpad, convertMilisegToYYYYMMDDHHMISS, convertMilisegToYYYYMMDD };
