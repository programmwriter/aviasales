import request from "./request";

export const getSearchId = () => {
  return request(`https://aviasales-test-api.java-mentor.com/search`);
};

export const getTickets = (searchId) => {
  return request(
    `https://aviasales-test-api.java-mentor.com/tickets?searchId=${searchId}`
  );
};
