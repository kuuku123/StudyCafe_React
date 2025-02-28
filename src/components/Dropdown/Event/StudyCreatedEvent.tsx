import React, { useEffect, useState } from "react";
import store from "../../../lib/features/redux/store";
import { minusStudyCreated } from "../../../lib/features/redux/notificationSlice";
import * as S from "../../Component_style";
import { Link } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import HandleResponseApi from "../../../lib/HandleResponse";
import StudyManagerApi from "../../../lib/apis/StudyManagerApi";
import NotificationApi from "../../../lib/apis/NotificationApi";
import { Notification } from "../../../utils/type";

interface StudyCreatedEventProps {
  id: number;
  studyPath: string;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const StudyCreatedEvent: React.FC<StudyCreatedEventProps> = ({
  id,
  studyPath,
  notifications,
  setNotifications,
}) => {
  console.log("path", studyPath, id);
  const handleResponse = HandleResponseApi.useHandleResponse();
  const [amiManager, setamiManager] = useState(false);

  const handleClick = () => {
    store.dispatch(minusStudyCreated(id));
    setNotifications(notifications.filter((noti) => noti.id !== id));
    NotificationApi.markNotificationChecked(id);
  };

  useEffect(() => {
    const amiManager = async () => {
      const response = await StudyManagerApi.amiManager(studyPath);
      handleResponse(response, setamiManager, {path:"", dialog:""});
    };
    amiManager();
  }, []);

  if (amiManager) {
    return (
      <Link style={S.link_style} to={RoutesEnum.STUDY_MANAGER(studyPath)}>
        <div onClick={handleClick}>[Study Created] {studyPath}</div>
      </Link>
    );
  }

  return (
    <Link style={S.link_style} to={RoutesEnum.STUDY_MEMBER(studyPath)}>
      <div onClick={handleClick}>[Study Created] {studyPath}</div>
    </Link>
  );
};

export default StudyCreatedEvent;
