import React from "react";
import classes from "./ticket.module.scss";
import logo from "../../images/S7_Logo.png";

const Ticket = () => {
  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <div className={classes.ticket__price}>13 400 Р</div>
        {/* <div className={classes.ticket__logo}>fds</div> */}
        <img src={logo} className={classes.ticket__logo} alt="logo" />
      </div>
      <div className={classes.ticket__item}>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>MOW – HKT</div>
          <div className={classes.ticket__text}>10:45 – 08:00</div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>В пути</div>
          <div className={classes.ticket__text}>21ч 15м</div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>2 пересадки</div>
          <div className={classes.ticket__text}>HKG, JNB</div>
        </div>
      </div>
      <div className={classes.ticket__item}>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>MOW – HKT</div>
          <div className={classes.ticket__text}>11:20 – 00:50</div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>В пути</div>
          <div className={classes.ticket__text}>13ч 30м</div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>1 пересадка</div>
          <div className={classes.ticket__text}>HKG</div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
