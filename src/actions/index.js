import {
  getSearchIdFromApi,
  getTicketsInLoop,
} from "../services/ticketServices";
import addIdToTickets from "../services/addIdToTickets";

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
export const completedLoading = (tickets) => ({
  type: "COMPLETED_LOADING",
  tickets,
});

export const asyncGetTickets = () => async (dispatch) => {
  try {
    const response = await getSearchIdFromApi();
    const { searchId } = response;

    dispatch(receiveSearchId(searchId));

    const addIdFn = addIdToTickets();
    const actions = { receiveTickets, completedLoading };

    getTicketsInLoop(searchId, dispatch, actions, addIdFn);
  } catch (error) {
    dispatch(throwError(error));
  }
};
