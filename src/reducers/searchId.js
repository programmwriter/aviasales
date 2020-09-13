import { RECEIVE_SEARCHID } from "../actions";

const initState = "";

const searchId = (state = initState, { type, payload }) => {
  if (type === RECEIVE_SEARCHID) {
    return payload;
  }
  return state;
};

export default searchId;
