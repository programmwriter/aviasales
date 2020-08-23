export const sortByPrice = (sortedTickets) => {
  const tempList = [...sortedTickets];
  return tempList.sort((first, second) =>
    first.price > second.price ? 1 : -1
  );
};
export const sortByDuration = (sortedTickets) => {
  const tempList = [...sortedTickets];
  return tempList.sort((first, second) =>
    first.segments[0].duration > second.segments[0].duration ? 1 : -1
  );
};

export const filterByTransfers = (tickets, tabs, filters) => {
  const tempList = [...tickets];

  tempList.filter((ticket) => {
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
    // for (let index = 0; index < filters.length; index++) {
    //   const {title, enabled} = filters[index];

    //   if(enabled){
    //     switch (title) {
    //       case 'all':
    //         flag = 1;
    //         break;
    //       case 'without':
    //         flag = stops.length === 0 ? 1 : 0;
    //         break;
    //       case 'one':
    //         flag = stops.length === 1 ? 1 : 0;
    //         break;
    //       case 'two':
    //         flag = stops.length === 2 ? 1 : 0;
    //         break;
    //       case 'three':
    //         flag = stops.length === 3 ? 1 : 0;
    //         break;
    //       default:
    //         flag = 0;
    //         break;
    //     }
    //   }

    // }
    // filters.forEach(({title, enabled}) => {

    //   if(enabled){
    //     switch (title) {
    //       case 'all':
    //         flag = 1;
    //         break;
    //       case 'without':
    //         flag = stops.length === 0 ? 1 : 0;
    //         break;
    //       case 'one':
    //         flag = stops.length === 1 ? 1 : 0;
    //         break;
    //       case 'two':
    //         flag = stops.length === 2 ? 1 : 0;
    //         break;
    //       case 'three':
    //         flag = stops.length === 3 ? 1 : 0;
    //         break;
    //       default:
    //         flag = 0;
    //         break;
    //     }
    //   }
    // });
    return flag;
  });

  // сортируем по количеству остановок
  const filteredTickets = filterByTransfers(tickets);

  const sortedTickets = tabs[0].active
    ? sortByPrice(filteredTickets)
    : sortByDuration(filteredTickets);
  return sortedTickets;
};
