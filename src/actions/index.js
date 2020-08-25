import axios from "axios";

// const baseUrl = 'https://aviasales-test-api.java-mentor.com';
const baseUrl = "https://front-test.beta.aviasales.ru";

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

export const receiveSearchId = (payload) => ({
  type: "RECEIVE_SEARCHID",
  payload,
});
export const receiveTickets = (payload) => ({
  type: "RECEIVE_TICKETS",
  payload,
});

const recursiveFetch = async (searchId, cb) => {
  const respTickets = await axios.get(
    `${baseUrl}/tickets?searchId=${searchId}`
  );
  cb(receiveTickets(respTickets.data));

  if (respTickets.data.stop) {
    return null;
  }

  const resp = await recursiveFetch(searchId, cb);
  return resp;
};

export const fetchTickets = () => async (dispatch) => {
  try {
    const respSearchId = await axios.get(`${baseUrl}/search`);

    dispatch(receiveSearchId(respSearchId.data.searchId));

    recursiveFetch(respSearchId.data.searchId, dispatch);
  } catch (error) {
    // console.log(`catch block of fetchTickets func ${error}`)
    dispatch(throwError(error));
  }
};
