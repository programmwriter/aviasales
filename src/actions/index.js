export const changeFilter = (title) => ({
  type: "CHANGE_FILTER",
  title,
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

export const fetchTickets = () => {
  return (dispatch) => {
    return fetch(`https://front-test.beta.aviasales.ru/search`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveSearchId(json));
        return json;
      })
      .then((data) => {
        return fetch(
          `https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`
        );
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return dispatch(receiveTickets(json));
      });
  };
};
