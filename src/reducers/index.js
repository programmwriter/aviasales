import { combineReducers } from "redux";
import searchIdReducer from "./searchId";
import ticketsReducer from "./tickets";
import tabsReducer from "./tabs";
import filtersReducer from "./filters";
import sortedTicketsReducer from "./sortedTickets";

import { COMPLETED_LOADING } from "../actions";

const completedLoading = (state = false, action) => {
  switch (action.type) {
    case COMPLETED_LOADING: {
      return true;
    }
    default:
      return state;
  }
};
const reducer = combineReducers({
  searchId: searchIdReducer,
  filters: filtersReducer,
  tickets: ticketsReducer,
  tabs: tabsReducer,
  sortedTickets: sortedTicketsReducer,
  completedLoading,
});
export default reducer;
