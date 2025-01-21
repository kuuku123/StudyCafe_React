import React, { useEffect, useState } from "react";
import * as S from "./NotificationHeader_style";
import { useSelector } from "react-redux";

const NotificationHeader = ({ setNotifications }) => {
  const [firstHovered, setFirstHovered] = useState(true);
  const { studyCreatedPath, studyUpdatedPath } = useSelector((state) => {
    console.log("state ", state);
    return {
      studyCreatedPath: state.notifications.messages.studyCreated.events,
      studyUpdatedPath: state.notifications.messages.studyUpdated.events,
    };
  });

  const handleClick = (tab) => {
    console.log("studyCreatedPath => ", studyCreatedPath);
    const createNotifications = (events, type) => {
      console.log("events => ",events)
      return events.map(({id,path}) => ({ id, path, type }));
    }

    let currentNotifications = [];

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
    setFirstHovered(true)
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
        onClick={() => handleClick("StudyCreated")}
      >
        Study Created
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style
        onClick={() => handleClick("StudyUpdated")}
      >
        Study Updated
      </S.Notification_HeaderItem_style>
    </S.Notification_Header_style>
  );
};

export default NotificationHeader;
