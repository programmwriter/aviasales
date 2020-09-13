import { RECEIVE_TICKETS } from "../actions";

const tickets = (state = [], { type, payload }) => {
  if (type === RECEIVE_TICKETS) {
    return [...state, ...payload];
  }
  return state;
};

export default tickets;
