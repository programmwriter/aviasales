import { combineReducers } from "redux";
import searchIdReducer from "./searchId";
import ticketsReducer from "./tickets";
import tabsReducer from "./tabs";
import filtersReducer from "./filters";

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
const rootReducer = combineReducers({
  searchId: searchIdReducer,
  filters: filtersReducer,
  tickets: ticketsReducer,
  tabs: tabsReducer,
  completedLoading,
});
export default rootReducer;
