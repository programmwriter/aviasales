import React from "react";
import PropTypes from "prop-types";
import classes from "./option.module.scss";

const Option = ({ data, onClick }) => {
  const { label, title, enabled } = data;

  const onChange = () => {
    onClick(title);
  };

  return (
    <div className={classes.option}>
      <label className={classes.check}>
        <input
          className={classes.check__input}
          type="checkbox"
          onChange={onChange}
          checked={enabled}
        />
        <span className={classes.check__box} />
        {label}
      </label>
    </div>
  );
};

export default Option;

Option.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    title: PropTypes.string,
    enabled: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
