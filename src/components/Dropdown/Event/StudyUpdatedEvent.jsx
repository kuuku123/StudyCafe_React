import React from "react";
import store from "../../../lib/features/redux/store";
import { minusStudyUpdated } from "../../../lib/features/redux/notificationSlice";

const StudyUpdatedEvent = ({ id, path, notifications, setNotifications }) => {
  console.log("path", path, id);
  const handleClick = () => {
    store.dispatch(minusStudyUpdated(id));
    setNotifications(notifications.filter((noti) => noti.id !== id));
  };
  return <div onClick={handleClick}>[Study Updated] {path}</div>;
};

export default StudyUpdatedEvent;
