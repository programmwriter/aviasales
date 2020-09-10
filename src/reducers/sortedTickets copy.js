import { RECEIVE_SORTED_TICKETS } from "../actions";

const initState = [];

const sortedTicketsReducer = (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_SORTED_TICKETS:
      return [...state, action.tickets];

    default:
      return state;
  }
};

export default sortedTicketsReducer;
