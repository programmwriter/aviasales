import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./filter.module.scss";
import Option from "../option";
import { changeFilter } from "../../actions";
// import { connect } from 'react-redux';

const Filter = ({ filters, onClick }) => {
  const filterList = filters.map((filter) => {
    return <Option key={filter.title} data={filter} onClick={onClick} />;
  });
  return (
    <div className={classes.filter}>
      <div className={classes.filter__title}>Количество пересадок</div>
      {filterList}
    </div>
  );
};
const mapStateToProps = ({ filters }) => ({
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (title) => {
    dispatch(changeFilter(title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
Filter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      enabled: PropTypes.bool,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
