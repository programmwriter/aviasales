import React from "react";
import PropTypes from "prop-types";
import classes from "./ticket.module.scss";
import * as format from "./formatFunc";

const Ticket = ({ ticket }) => {
  const {
    carrier,
    price,
    segments: [mow, nkt],
  } = ticket;

  const imgUrl = `http://pics.avs.io/99/36/${carrier}.png`;
  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <div className={classes.ticket__price}>{`${format.price(
          price
        )} Р`}</div>

        <img src={imgUrl} className={classes.ticket__logo} alt="logo" />
      </div>
      <div className={classes.ticket__item}>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>MOW – HKT</div>
          <div className={classes.ticket__text}>
            {format.mowNkt(mow.date, mow.duration)}
          </div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>В пути</div>
          <div className={classes.ticket__text}>
            {format.duration(mow.duration)}
          </div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>
            {format.transfersLabel(mow.stops.length)}
          </div>
          <div className={classes.ticket__text}>
            {format.transfers(mow.stops) || 0}
          </div>
        </div>
      </div>
      <div className={classes.ticket__item}>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>MOW – HKT</div>
          <div className={classes.ticket__text}>
            {format.mowNkt(nkt.date, nkt.duration)}
          </div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>В пути</div>
          <div className={classes.ticket__text}>
            {format.duration(nkt.duration)}
          </div>
        </div>
        <div className={classes.ticket__column}>
          <div className={classes.ticket__title}>
            {format.transfersLabel(nkt.stops.length)}
          </div>
          <div className={classes.ticket__text}>
            {format.transfers(nkt.stops) || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

Ticket.propTypes = {
  ticket: PropTypes.shape({
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
  }).isRequired,
};
