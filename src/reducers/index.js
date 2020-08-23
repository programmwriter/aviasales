import { sortByPrice, sortByDuration } from "./sorts";

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
  tickets: [],
  sortedTickets: [],
};
const toggleTab = (store, id) => {
  const { tabs, tickets } = store;
  const tempTickets = id === 1 ? sortByPrice(tickets) : sortByDuration(tickets);

  const tempTabs = tabs.map((tab) => {
    return tab.id === id ? { ...tab, active: true } : { ...tab, active: false };
  });

  return {
    tabs: tempTabs,
    sortedTickets: tempTickets,
  };
};
const switchFilters = ({ filters }, title) => {
  // Если включается галочка "Все" - проставляются галочки всем остальным фильтрам
  if (title === "all") {
    const idx = filters.findIndex((el) => el.title === "all");
    const { enabled } = filters[idx];
    return filters.map((filter) => ({ ...filter, enabled: !enabled }));
  }

  // активируется необходимая галочка
  const newFilters = filters.map((filter) => {
    return filter.title === title
      ? { ...filter, enabled: !filter.enabled }
      : filter;
  });

  // количество проставленных галочек
  const countEnabled = newFilters.reduce((acc, filter) => {
    const status = filter.title !== "all" && filter.enabled ? 1 : 0;
    return acc + status;
  }, 0);

  // Если проставить каждую галочку по пересадкам - галочка "Все" автоматически включится
  if (countEnabled === newFilters.length - 1) {
    return newFilters.map((filter) => {
      return filter.title === "all" ? { ...filter, enabled: true } : filter;
    });
  }
  // Если при включенной галочке "Все" снимается любая другая галочка - галочка "Все" тоже снимается
  if (countEnabled !== newFilters.length - 1) {
    return newFilters.map((filter) => {
      return filter.title === "all" ? { ...filter, enabled: false } : filter;
    });
  }

  return newFilters;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return { ...state, filters: switchFilters(state, action.title) };

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
      return { ...state, tickets, sortedTickets };
    }
    default:
      return state;
  }
};

export default reducer;
