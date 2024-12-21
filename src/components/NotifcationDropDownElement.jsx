import React from "react";
import store from "../lib/features/redux/store";
import { minusStudyCreated } from "../lib/features/redux/notificationSlice";

const NotifcationDropDownElement = ({ path, type }) => {
  console.log("path", path, type);
  const handleClick = () => {
    store.dispatch(minusStudyCreated(path));
  };
  return <div onClick={handleClick}>[Study {type}]{path}</div>;
};

export default NotifcationDropDownElement;
