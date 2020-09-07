import {
  toggleTab,
  manipulateWithTickets,
  filterByTransfers,
} from "../services/sortTickets";

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
      enabled: true,
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
  error: {
    status: false,
    message: "",
  },
  completedLoading: false,
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

    case "THROW_ERROR": {
      const { status } = state.error;
      const { message } = action.message;
      return { ...state, error: { status: !status, message } };
    }
    case "TOGGLE_TAB": {
      const { tabs, sortedTickets } = toggleTab(state, action.id);
      return { ...state, tabs, sortedTickets };
    }

    case "RECEIVE_SEARCHID": {
      const { searchId } = action;
      return { ...state, searchId };
    }

    case "COMPLETED_LOADING": {
      return { ...state, completedLoading: true };
    }

    case "RECEIVE_TICKETS": {
      const { tickets: stateTickets, tabs, filters } = state;
      const { tickets: fetchedTickets } = action;
      const sortedTickets = filterByTransfers(
        [...stateTickets, ...fetchedTickets],
        tabs,
        filters
      );
      return {
        ...state,
        tickets: [...stateTickets, ...fetchedTickets],
        sortedTickets,
      };
    }
    default:
      return state;
  }
};

export default reducer;
