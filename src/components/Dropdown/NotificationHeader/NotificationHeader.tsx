import React, { useEffect, useState } from "react";
import * as S from "./NotificationHeader_style";
import { useSelector } from "react-redux";
import {
  selectStudyCreated,
  selectStudyUpdated,
} from "../../../lib/features/redux/notificationSelector";
import { Notification, NotificationDto } from "../../../utils/type";

interface NotificationHeaderProps {
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}


const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  setNotifications,
}) => {
  const [firstHovered, setFirstHovered] = useState(true);

  const studyCreatedPath = useSelector(selectStudyCreated);
  const studyUpdatedPath = useSelector(selectStudyUpdated);

  const handleClick = (tab: string) => {
    console.log("studyCreatedPath => ", studyCreatedPath);
    const createNotifications = (events: NotificationDto[], type: string) => {
      console.log("events => ", events);
      return events.map(({ id, studyPath }) => ({ id, studyPath, type }));
    };

    let currentNotifications: Notification[] = [];

    switch (tab) {
      case "All":
        currentNotifications = [
          ...createNotifications(studyCreatedPath, "studyCreated"),
          ...createNotifications(studyUpdatedPath, "studyUpdated"),
        ];
        break;
      case "StudyCreated":
        currentNotifications = createNotifications(
          studyCreatedPath,
          "studyCreated"
        );
        break;
      case "StudyUpdated":
        currentNotifications = createNotifications(
          studyUpdatedPath,
          "studyUpdated"
        );
        break;
      default:
        break;
    }
    console.log("currentNotifications => ", currentNotifications);
    setNotifications(currentNotifications);
    setFirstHovered(false);
  };

  useEffect(() => {
    handleClick("All");
    setFirstHovered(true);
  }, []);

  return (
    <S.Notification_Header_style>
      <S.Notification_HeaderItem_style
        onClick={() => handleClick("All")}
        isFirstHovered={firstHovered}
      >
        All
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style
        isFirstHovered={false}
        onClick={() => handleClick("StudyCreated")}
      >
        Study Created
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style
        isFirstHovered={false}
        onClick={() => handleClick("StudyUpdated")}
      >
        Study Updated
      </S.Notification_HeaderItem_style>
    </S.Notification_Header_style>
  );
};

export default NotificationHeader;
