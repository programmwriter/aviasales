import request from "./request";

export const getSearchIdFromApi = () => {
  return request(`https://front-test.beta.aviasales.ru/search`);
};

export const getTicketsFromApi = (searchId) => {
  return request(
    `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
  );
};

export const getTicketsInLoop = async (
  searchId,
  cbDispatch,
  actions,
  addIdFn
) => {
  const response = await getTicketsFromApi(searchId);
  const { tickets, stop } = response;

  const ticketsWithId = addIdFn(tickets);
  const { receiveTickets, completedLoading } = actions;

  cbDispatch(receiveTickets(ticketsWithId));

  if (!stop) {
    await getTicketsInLoop(searchId, cbDispatch, actions, addIdFn);
  }

  cbDispatch(completedLoading());
  return null;
};
