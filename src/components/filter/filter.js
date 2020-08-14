import React from "react";
import classes from "./filter.module.scss";
import Option from "../option";

const Filter = () => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter__title}>Количество пересадок</div>
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
    </div>
  );
};

export default Filter;
