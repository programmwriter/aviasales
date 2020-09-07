import React from "react";

import { Alert } from "antd";

import "antd/dist/antd.css";

const Warning = () => {
  return (
    <>
      <Alert
        message="Выберите фильтр"
        description="Рейсов, подходящих под заданные фильтры, не найдено"
        type="warning"
      />
    </>
  );
};

export default Warning;
