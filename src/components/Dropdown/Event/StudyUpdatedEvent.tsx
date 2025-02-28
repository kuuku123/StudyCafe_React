import React, { useEffect, useState } from "react";
import store from "../../../lib/features/redux/store";
import { minusStudyUpdated } from "../../../lib/features/redux/notificationSlice";
import * as S from "../../Component_style";
import { Link } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import StudyManagerApi from "../../../lib/apis/StudyManagerApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import NotificationApi from "../../../lib/apis/NotificationApi";
import { Notification } from "../../../utils/type";

interface StudyUpdatedEventProps {
  id: number;
  studyPath: string;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const StudyUpdatedEvent: React.FC<StudyUpdatedEventProps> = ({
  id,
  studyPath,
  notifications,
  setNotifications,
}) => {
  const handleResponse = HandleResponseApi.useHandleResponse();
  const [amiManager, setamiManager] = useState(false);
  console.log("path", studyPath, id, notifications);
  const handleClick = () => {
    store.dispatch(minusStudyUpdated(id));
    setNotifications(
      notifications.filter((noti) => {
        console.log("Checking notification:", noti, " ", id); // Log each notification before filtering
        return noti.id !== id;
      })
    );
    NotificationApi.markNotificationChecked(id);
  };

  useEffect(() => {
    const amiManager = async () => {
      const response = await StudyManagerApi.amiManager(studyPath);
      handleResponse(response, setamiManager, { path: "", dialog: "" });
    };
    amiManager();
  }, []);

  if (amiManager) {
    return (
      <Link style={S.link_style} to={RoutesEnum.STUDY_MANAGER(studyPath)}>
        <div onClick={handleClick}>
          [(M) Study Updated {id}] {studyPath}
        </div>
      </Link>
    );
  }

  return (
    <Link style={S.link_style} to={RoutesEnum.STUDY_MEMBER(studyPath)}>
      <div onClick={handleClick}>
        [Study Updated {id}] {studyPath}
      </div>
    </Link>
  );
};

export default StudyUpdatedEvent;
