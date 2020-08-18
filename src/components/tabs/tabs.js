import React from "react";
import classNames from "classnames";
import classes from "./tabs.module.scss";

const Tabs = () => {
  const leftTabItemClass = classNames({
    [classes.tabs__item]: true,
    [classes.tabs__item_active]: true,
    [classes.tabs__item_left]: true,
  });

  const rightTabItemClass = classNames({
    [classes.tabs__item]: true,
    [classes.tabs__item_active]: false,
    [classes.tabs__item_right]: true,
  });

  return (
    <div className={classes.tabs}>
      <div className={leftTabItemClass}> Самый дешевый </div>
      <div className={rightTabItemClass}> Самый быстрый</div>
    </div>
  );
};

export default Tabs;
