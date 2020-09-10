import { getSearchId, getTickets } from "../services/apiServices";
import addIdToTickets from "../services/addIdToTickets";

export const CHANGE_FILTER = "CHANGE_FILTER";
export const THROW_ERROR = "THROW_ERROR";
export const TOGGLE_TAB = "TOGGLE_TAB";
export const RECEIVE_SEARCHID = "RECEIVE_SEARCHID";
export const RECEIVE_TICKETS = "RECEIVE_TICKETS";
export const RECEIVE_SORTED_TICKETS = "RECEIVE_SORTED_TICKETS";
export const COMPLETED_LOADING = "COMPLETED_LOADING";

export const changeFilter = (title) => ({
  type: "CHANGE_FILTER",
  title,
});
export const throwError = (message) => ({
  type: "THROW_ERROR",
  message,
});
export const toggleTab = (id) => ({
  type: "TOGGLE_TAB",
  id,
});

export const receiveSearchId = (searchId) => ({
  type: "RECEIVE_SEARCHID",
  searchId,
});
export const receiveTickets = (tickets) => ({
  type: "RECEIVE_TICKETS",
  tickets,
});
export const receiveSortedTickets = (tickets) => ({
  type: "RECEIVE_SORTED_TICKETS",
  tickets,
});
export const completedLoading = () => ({
  type: "COMPLETED_LOADING",
});

const getTicketsInLoop = async (searchId, cbDispatch, addIdFn) => {
  const response = await getTickets(searchId);
  const { tickets, stop } = response;

  const ticketsWithId = addIdFn(tickets);

  cbDispatch(receiveTickets(ticketsWithId));

  if (!stop) {
    await getTicketsInLoop(searchId, cbDispatch, addIdFn);
  }

  cbDispatch(completedLoading());
  return null;
};

export const asyncGetTickets = () => async (dispatch) => {
  try {
    const response = await getSearchId();
    const { searchId } = response;

    dispatch(receiveSearchId(searchId));

    const addIdFn = addIdToTickets();

    getTicketsInLoop(searchId, dispatch, addIdFn);
  } catch (error) {
    dispatch(throwError(error));
  }
};
