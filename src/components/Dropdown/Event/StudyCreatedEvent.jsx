import React, { useEffect, useState } from "react";
import store from "../../../lib/features/redux/store";
import { minusStudyCreated } from "../../../lib/features/redux/notificationSlice";
import * as S from "../../Component_style";
import { Link } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import HandleResponseApi from "../../../lib/HandleResponse";
import StudyManagerApi from "../../../lib/apis/StudyManagerApi";
import NotificationApi from "../../../lib/apis/NotificationApi";

const StudyCreatedEvent = ({ id, path, notifications, setNotifications }) => {
  console.log("path", path, id);
  const handleResponse = HandleResponseApi.useHandleResponse();
  const [isManager, setIsManager] = useState(false);
  
  const handleClick = () => {
    store.dispatch(minusStudyCreated(id));
    setNotifications(notifications.filter((noti) => noti.id !== id));
    NotificationApi.markNotificationChecked(id);
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
        <div onClick={handleClick}>[Study Created] {path}</div>
      </Link>
    );
  }

  return (
    <Link style={S.link_style} to={RoutesEnum.STUDY_MEMBER(path)}>
      <div onClick={handleClick}>[Study Created] {path}</div>
    </Link>
  );
};

export default StudyCreatedEvent;
