import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Spin, Alert } from "antd";

import "antd/dist/antd.css";

const Loading = ({ loading }) => {
  // const content = !loading? <Spin />:<div>Completed</div>;
  // console.log(loading)
  return (
    <>
      <Spin spinning={!loading}>
        <Alert message="Info" description="Tickets loaded!!!" type="info" />
      </Spin>
    </>
  );
  // return (
  //   <>
  //     {content}
  //   </>
  // );
};

const mapStateToProps = ({ completedLoading }) => ({
  loading: completedLoading,
});

export default connect(mapStateToProps)(Loading);

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
