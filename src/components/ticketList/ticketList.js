import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./ticketList.scss";
import Ticket from "../ticket";

const TicketList = ({ sortedTickets }) => {
  const ticketsList = sortedTickets.map((ticket) => {
    return (
      <Ticket
        key={`${ticket.price}${ticket.segments[0].date}`}
        ticket={ticket}
      />
    );
  });

  return <>{ticketsList}</>;
};

const mapStateToProps = ({ sortedTickets }) => ({
  sortedTickets,
});

export default connect(mapStateToProps)(TicketList);

TicketList.propTypes = {
  sortedTickets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};
