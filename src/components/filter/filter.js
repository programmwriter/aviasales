import React from "react";
import classes from "./filter.module.scss";
import Option from "../option";
// import { connect } from 'react-redux';

const Filter = () => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter__title}>Количество пересадок</div>
      <Option label="Все" />
      <Option label="Без пересадок" />
      <Option label="1 пересадка" />
      <Option label="2 пересадки " />
      <Option label="3 пересадки" />
    </div>
  );
};

export default Filter;
