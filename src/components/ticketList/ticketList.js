import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./ticketList.scss";
import Ticket from "../ticket";
import Error from "../error";

const TicketList = ({ sortedTickets, emptyFilters }) => {
  const ticketsList = sortedTickets.slice(0, 5).map((ticket) => {
    return <Ticket key={`${ticket.id}`} ticket={ticket} />;
  });

  const content = !emptyFilters ? <Error /> : ticketsList;

  return <>{content} </>;
};

const mapStateToProps = ({ sortedTickets, filters }) => {
  const emptyFilters = filters.reduce((acc, filter) => {
    const status = filter.title !== "all" && filter.enabled ? 1 : 0;
    return acc + status;
  }, 0);

  return { sortedTickets, emptyFilters };
};

export default connect(mapStateToProps)(TicketList);

TicketList.propTypes = {
  sortedTickets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  emptyFilters: PropTypes.number.isRequired,
};
