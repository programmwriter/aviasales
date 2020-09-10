import { RECEIVE_TICKETS } from "../actions";

const initState = [];

const ticketsReducer = (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_TICKETS:
      return [...state, action.tickets];

    default:
      return state;
  }
};

export default ticketsReducer;
