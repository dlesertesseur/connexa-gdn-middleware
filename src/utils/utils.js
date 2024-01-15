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

function daysInYear(year) {
  return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
}

function sortData(data, property, direction) {
  data.sort(function (a, b) {
    var valueA = a[property];
    var valueB = b[property];

    if (direction === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function daysInTimeFrame(startYear, endYear) {
  let totalDays = 0;
  const daysByYearMonth = new Map();

  const diff = endYear - startYear;
  if (diff > 0) {
    for (let index = 0; index <= diff; index++) {
      const year = startYear + index;

      for (let month = 0; month < 12; month++) {
        const days = daysInMonth(month + 1, year);
        totalDays += days;
        daysByYearMonth.set(`${year}-${month}`, days);
      }
    }
  }
  return { totalDays: totalDays, daysByYearMonth: daysByYearMonth };
}

function diffBetweenDays(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return(diffDays);
}

export {
  lpad,
  convertMilisegToYYYYMMDDHHMISS,
  convertMilisegToYYYYMMDD,
  daysInYear,
  sortData,
  daysInMonth,
  daysInTimeFrame,
  diffBetweenDays
};
