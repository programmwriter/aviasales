const sortByPrice = (ticketsList) => {
  const tempList = [...ticketsList];
  return tempList.sort((first, second) =>
    first.price > second.price ? 1 : -1
  );
};

const sortByDuration = (ticketsList) => {
  const tempList = [...ticketsList];
  return tempList.sort((first, second) =>
    first.segments[0].duration > second.segments[0].duration ? 1 : -1
  );
};

const manipulateWithTickets = (filters, tickets, tabs) => {
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

export default manipulateWithTickets;
