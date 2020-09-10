import { RECEIVE_SEARCHID } from "../actions";

const initState = "";

const searchIdReducer = (state = initState, action) => {
  // console.log(`search ID reducer ${state}`)
  switch (action.type) {
    case RECEIVE_SEARCHID: {
      const { searchId } = action;

      return searchId;
    }

    default:
      return state;
  }
};

export default searchIdReducer;
