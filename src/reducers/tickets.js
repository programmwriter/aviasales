import { RECEIVE_TICKETS } from "../actions";

const ticketsReducer = (state = [], action) => {
  if (action.type === RECEIVE_TICKETS) {
    return [...state, ...action.tickets];
  }
  return state;
};

export default ticketsReducer;
