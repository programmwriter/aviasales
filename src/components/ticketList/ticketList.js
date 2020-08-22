import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./ticketList.scss";
import Ticket from "../ticket";

import { fetchTickets } from "../../actions";

const TicketList = ({ tickets, getTickets }) => {
  useEffect(() => {
    getTickets();
  }, []);

  const ticketsList = tickets.map((ticket) => {
    return (
      <Ticket
        key={`${ticket.price}${ticket.segments[0].date}`}
        ticket={ticket}
      />
    );
  });

  return <>{ticketsList}</>;
};

const mapStateToProps = ({ tickets }) => ({
  tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => {
    dispatch(fetchTickets());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  getTickets: PropTypes.func.isRequired,
};
