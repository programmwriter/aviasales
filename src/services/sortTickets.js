export const sortByPrice = (ticketsList) => {
  const tempList = [...ticketsList];
  return tempList.sort((first, second) =>
    first.price > second.price ? 1 : -1
  );
};

export const sortByDuration = (ticketsList) => {
  const tempList = [...ticketsList];
  return tempList.sort((first, second) =>
    first.segments[0].duration > second.segments[0].duration ? 1 : -1
  );
};

export const filterByTransfers = (tickets, tabs, filters) => {
  const tempList = tickets.filter((ticket) => {
    const {
      segments: [first],
    } = ticket;
    const { stops } = first;
    let flag = 0;

    for (const { title, enabled } of filters) {
      if (enabled) {
        switch (title) {
          case "all":
            flag = 1;
            break;
          case "without":
            flag = stops.length === 0 ? 1 : 0;
            break;
          case "one":
            flag = stops.length === 1 ? 1 : 0;
            break;
          case "two":
            flag = stops.length === 2 ? 1 : 0;
            break;
          case "three":
            flag = stops.length === 3 ? 1 : 0;
            break;
          default:
            flag = 0;
            break;
        }
      }
    }
    return flag;
  });

  const sortedTickets = tabs[0].active
    ? sortByPrice(tempList)
    : sortByDuration(tempList);
  return sortedTickets;
};

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

export const toggleTab = (store, id) => {
  const { tabs, sortedTickets } = store;
  const tempTickets =
    id === 1 ? sortByPrice(sortedTickets) : sortByDuration(sortedTickets);

  const tempTabs = tabs.map((tab) => {
    return tab.id === id ? { ...tab, active: true } : { ...tab, active: false };
  });

  return {
    tabs: tempTabs,
    sortedTickets: tempTickets,
  };
};

export const manipulateWithTickets = (state, title) => {
  const { filters, tickets, tabs } = state;

  const sortedFilters = switchFilters(filters, title);

  const sortedTickets = filterByTransfers(tickets, tabs, sortedFilters);

  return {
    filters: sortedFilters,
    sortedTickets,
  };
};
