import React from "react";

import { Alert } from "antd";

import "antd/dist/antd.css";

const Error = () => {
  return (
    <>
      <Alert
        message="Warning Text"
        description="Рейсов, подходящих под заданные фильтры, не найдено"
        type="warning"
      />
    </>
  );
};

export default Error;
