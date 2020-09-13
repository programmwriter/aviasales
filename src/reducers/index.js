import { combineReducers } from "redux";
import searchId from "./searchId";
import tickets from "./tickets";
import tabs from "./tabs";
import filters from "./filters";

import { COMPLETED_LOADING } from "../actions";

const completedLoading = (state = false, { type }) => {
  if (type === COMPLETED_LOADING) {
    return true;
  }
  return state;
};

const rootReducer = combineReducers({
  searchId,
  filters,
  tickets,
  tabs,
  completedLoading,
});
export default rootReducer;
