import { sortByPrice, toggleTab, manipulateWithTickets } from "./sorts";

const initialState = {
  filters: [
    {
      title: "all",
      label: "Все",
      enabled: false,
    },
    {
      title: "without",
      label: "Без пересадок",
      enabled: false,
    },
    {
      title: "one",
      label: "1 пересадка",
      enabled: false,
    },
    {
      title: "two",
      label: "2 пересадки",
      enabled: false,
    },
    {
      title: "three",
      label: "3 пересадки",
      enabled: false,
    },
  ],
  tabs: [
    {
      label: "САМЫЙ ДЕШЕВЫЙ",
      id: 1,
      active: true,
    },
    {
      label: "САМЫЙ БЫСТРЫЙ",
      id: 2,
      active: false,
    },
  ],
  searchId: "",
  lastFetchDate: "",
  error: false,
  loaded: false,
  fetchingStopFlag: false,
  tickets: [],
  sortedTickets: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER": {
      const { filters, sortedTickets } = manipulateWithTickets(
        state,
        action.title
      );
      return { ...state, filters, sortedTickets };
    }

    case "TOGGLE_TAB": {
      const { tabs, sortedTickets } = toggleTab(state, action.id);
      return { ...state, tabs, sortedTickets };
    }

    case "RECEIVE_SEARCHID": {
      const { searchId } = action.payload;
      return { ...state, searchId };
    }

    case "RECEIVE_TICKETS": {
      const { tickets } = action.payload;
      const sortedTickets = sortByPrice(tickets);
      return {
        ...state,
        tickets,
        sortedTickets,
        lastFetchDate: action.lastFetchDate,
      };
    }
    default:
      return state;
  }
};

export default reducer;
