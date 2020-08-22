import moment from "moment";

export const price = (priceVal = 0) => {
  const strPrise = `${priceVal}`;
  if (strPrise.length <= 3) return priceVal;
  const length = strPrise.length - 3;

  return `${strPrise.slice(0, length)} ${strPrise.substring(
    strPrise.length - 3
  )}`;
};
export const transfers = (transfArr = []) => {
  return transfArr.join(", ");
};

export function duration(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}ч  ${minutes}м`;
}

export const mowNkt = (date, durationVal) => {
  return `${moment(date).format("hh:mm")} - ${moment(date)
    .add(durationVal, "minutes")
    .format("hh:mm")}`;
};

export const transfersLabel = (data) => {
  const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
    txt[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];

  return `${data} ${sklonenie(data, ["пересадка", "пересадки", "пересадок"])}`;
};
