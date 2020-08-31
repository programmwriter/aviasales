import React from "react";
import PropTypes from "prop-types";

const Loading = ({ error, loading }) => {
  if (!loading || !error) {
    return <div>spiner</div>;
  }

  return (
    <>
      <div>{error}</div>
      <div>{loading}</div>
    </>
  );
};

Loading.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
