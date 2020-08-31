const addIdToTickets = () => {
  let ids = 100;

  return (ticketList) => {
    return ticketList.map((ticket) => {
      ids += 1;
      return { id: ids, ...ticket };
    });
  };
};

export default addIdToTickets;
