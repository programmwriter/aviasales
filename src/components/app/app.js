import React from "react";
import classes from "./app.module.scss";
import logo from "../../images/Logo.svg";
import Filter from "../filter";
import Tabs from "../tabs";
import TicketList from "../ticketList";

const App = () => {
  return (
    <div className={classes.app}>
      <div className={classes.app__header}>
        <img alt="logo" src={logo} />
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

export default App;
