import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./ticketList.scss";
import Ticket from "../ticket";
import Warning from "../warning";
import manipulateWithTickets from "../../services/sortTickets";

const TicketList = ({ tickets, tabs, filters }) => {
  const filteredTickets = manipulateWithTickets(filters, tickets, tabs);

  const ticketsList = filteredTickets.slice(0, 5).map((ticket) => {
    return <Ticket key={`${ticket.id}`} ticket={ticket} />;
  });

  const isEmptyFilters = filters.reduce((acc, filter) => {
    const status = filter.title !== "all" && filter.enabled ? 1 : 0;
    return acc + status;
  }, 0);

  const content = !isEmptyFilters ? <Warning /> : ticketsList;

  return <>{content} </>;
};

const mapStateToProps = ({ tickets, filters, tabs }) => {
  return { tickets, tabs, filters };
};

export default connect(mapStateToProps)(TicketList);

TicketList.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      enabled: PropTypes.bool,
    })
  ).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      carrier: PropTypes.string,
      segments: PropTypes.arrayOf(
        PropTypes.shape({
          origin: PropTypes.string,
          destination: PropTypes.string,
          date: PropTypes.string,
          stops: PropTypes.arrayOf(PropTypes.string),
          duration: PropTypes.number,
        })
      ),
    })
  ).isRequired,
};
