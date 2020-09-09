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
  const filteredTickets = tickets.filter((ticket) => {
    const { stops } = ticket.segments[0];
    const countTransfers = stops.length;
    let isTicketInFilter = false;

    for (const { title, enabled } of filters) {
      if (enabled) {
        switch (title) {
          case "all":
            isTicketInFilter = true;
            break;
          case "without":
            isTicketInFilter = countTransfers === 0;
            break;
          case "one":
            isTicketInFilter = countTransfers === 1;
            break;
          case "two":
            isTicketInFilter = countTransfers === 2;
            break;
          case "three":
            isTicketInFilter = countTransfers === 3;
            break;
          default:
            isTicketInFilter = false;
            break;
        }
      }
    }
    return isTicketInFilter;
  });

  const isCurrentSortMetodPrice = tabs[0].active;

  const sortedTickets = isCurrentSortMetodPrice
    ? sortByPrice(filteredTickets)
    : sortByDuration(filteredTickets);

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
