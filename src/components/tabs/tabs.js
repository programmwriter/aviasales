import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import classes from "./tabs.module.scss";

import { toggleTab } from "../../actions";

const Tabs = ({ tabs, changeTab }) => {
  const tabsList = tabs.map((tab) => {
    const { label, active } = tab;

    const tabItemClass = classNames({
      [classes.tabs__item]: true,
      [classes.tabs__item_active]: active,
    });

    return (
      <button
        key={label}
        type="button"
        className={tabItemClass}
        onClick={() => changeTab()}
      >
        {label}
      </button>
    );
  });

  return <div className={classes.tabs}>{tabsList}</div>;
};
const mapStateToProps = ({ tabs }) => ({
  tabs,
});

const mapDispatchToProps = (dispatch) => ({
  changeTab: () => {
    dispatch(toggleTab());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  changeTab: PropTypes.func.isRequired,
};
