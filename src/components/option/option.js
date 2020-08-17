import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./option.module.scss";

const Option = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const onChange = (event) => {
    const { target } = event;
    setChecked(target.checked);
    console.log(target.checked);
  };

  return (
    <div className={classes.option}>
      <label className={classes.check}>
        <input
          className={classes.check__input}
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        <span className={classes.check__box} />
        {label}
      </label>
    </div>
  );
};

export default Option;

Option.propTypes = {
  label: PropTypes.string.isRequired,
};
