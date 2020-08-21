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
      name: "chiper",
      active: true,
    },
    {
      label: "САМЫЙ БЫСТРЫЙ",
      name: "faster",
      active: false,
    },
  ],
};
const toggleTab = ({ tabs }) => {
  return tabs.map((tab) => ({ ...tab, active: !tab.active }));
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

    case "TOGGLE_TAB":
      return { ...state, tabs: toggleTab(state) };

    default:
      return state;
  }
};

export default reducer;
