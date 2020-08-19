const initialState = {
  all: false,
  without: false,
  one: false,
  two: false,
  three: false,
};

const switchFilters = (filters, name) => {
  // const val = filters[name];
  return {
    ...filters,
    [name]: !filters[name],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return switchFilters(state, action.filter);
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default reducer;
