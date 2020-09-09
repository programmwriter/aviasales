import request from "./request";

export const getSearchId = () => {
  return request(`https://front-test.beta.aviasales.ru/search`);
};

export const getTickets = (searchId) => {
  return request(
    `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
  );
};
