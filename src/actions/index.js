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

// const recursiveFetch = (searchId, dispatch) => {
//   return fetch(
//     `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
//   )
//   .then((response) => response.json())
//   .then((json) => {
//     dispatch(receiveTickets(json));
//     if(!json.stop){
//       recursiveFetch(searchId);
//     }
//     return dispatch(receiveTickets(json));
//   })
// }

export const fetchTickets = () => {
  return (dispatch) => {
    return (
      fetch(`https://front-test.beta.aviasales.ru/search`)
        .then((response) => response.json())
        .then((json) => {
          dispatch(receiveSearchId(json));
          return json;
        })
        .then((data) => {
          const recursiveFetch = (searchId) => {
            return fetch(
              `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
            )
              .then((response) => response.json())
              .then((json) => {
                dispatch(receiveTickets(json));
                if (!json.stop) {
                  recursiveFetch(searchId);
                }
                return dispatch(receiveTickets(json));
              });
          };
          return recursiveFetch(data.searchId);
          // return fetch(
          //   `https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`
          // );
        })
        // .then((response) => response.json())
        // .then((json) => {
        //   return dispatch(receiveTickets(json));
        // })
        .catch((error) => {
          return dispatch(throwError(error));
        })
    );
  };
};
