import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./app.module.scss";
import logo from "../../images/Logo.svg";
import Filter from "../filter";
import Tabs from "../tabs";
import TicketList from "../ticketList";
import Loading from "../loading";
import { asyncGetTickets, receiveSortedTickets } from "../../actions";
import { manipulateWithTickets } from "../../services/sortTickets";

const App = ({
  asyncGetTicketsWithDispatch,
  dispatchSortedTickets,
  tabs,
  filters,
  tickets,
}) => {
  useEffect(() => {
    asyncGetTicketsWithDispatch();
  });

  useEffect(() => {
    const sortedTickets = manipulateWithTickets(filters, tickets, tabs);

    dispatchSortedTickets(sortedTickets);
  }, [tabs, filters, tickets]);

  return (
    <div className={classes.app}>
      <div className={classes.app__header}>
        <img alt="logo" src={logo} />
        <Loading />
      </div>
      <div className={classes.app__wrapper}>
        <div className={classes.app__side}>
          <Filter />
        </div>
        <div className={classes.app__content}>
          <Tabs />
          <TicketList />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  asyncGetTicketsWithDispatch: () => dispatch(asyncGetTickets()),
  dispatchSortedTickets: () => dispatch(receiveSortedTickets()),
});

const mapStateToProps = ({ tabs, filters, tickets }) => {
  return {
    tabs,
    filters,
    tickets,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  asyncGetTicketsWithDispatch: PropTypes.func.isRequired,
  dispatchSortedTickets: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      enabled: PropTypes.bool,
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
