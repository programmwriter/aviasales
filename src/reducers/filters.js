import { CHANGE_FILTER } from "../actions";

const initialState = [
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
];

const switchFilters = (filters, title) => {
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

const filtersReducer = (state = initialState, action) => {
  if (action.type === CHANGE_FILTER) {
    const filters = switchFilters(state, action.title);
    return [...filters];
  }
  return state;
};

export default filtersReducer;
