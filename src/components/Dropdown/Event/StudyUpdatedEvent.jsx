import React, { useEffect, useState } from "react";
import store from "../../../lib/features/redux/store";
import { minusStudyUpdated } from "../../../lib/features/redux/notificationSlice";
import * as S from "../../Component_style";
import { Link } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import StudyManagerApi from "../../../lib/apis/StudyManagerApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import NotificationApi from "../../../lib/apis/NotificationApi";

const StudyUpdatedEvent = ({ id, path, notifications, setNotifications }) => {
  const handleResponse = HandleResponseApi.useHandleResponse();
  const [isManager, setIsManager] = useState(false);
  console.log("path", path, id);
  const handleClick = () => {
    store.dispatch(minusStudyUpdated(id));
    setNotifications(notifications.filter((noti) => noti.id !== id));
    NotificationApi.markNotificationRead(id)
  };

  useEffect(() => {
    const isManager = async () => {
      const response = await StudyManagerApi.isManager(path);
      handleResponse(response, setIsManager, false);
    };
    isManager();
  }, []);

  if (isManager) {
    return (
      <Link style={S.link_style} to={RoutesEnum.STUDY_MANAGER(path)}>
        <div onClick={handleClick}>[Study Updated] {path}</div>
      </Link>
    );
  }

  return (
    <Link style={S.link_style} to={RoutesEnum.STUDY_MEMBER(path)}>
      <div onClick={handleClick}>[Study Updated] {path}</div>
    </Link>
  );
};

export default StudyUpdatedEvent;
