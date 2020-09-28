import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./app.module.scss";
import logo from "../../images/Logo.svg";
import Filter from "../filter";
import Tabs from "../tabs";
import TicketList from "../ticketList";
import Loading from "../loading";
import { asyncGetTickets } from "../../actions";

const App = ({ asyncGetTicketsWithDispatch }) => {
  useEffect(() => {
    asyncGetTicketsWithDispatch();
  });

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
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  asyncGetTicketsWithDispatch: PropTypes.func.isRequired,
};
