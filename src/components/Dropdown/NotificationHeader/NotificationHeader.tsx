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
  const [activeTab, setActiveTab] = useState<string>("All");

  const studyCreatedPath = useSelector(selectStudyCreated);
  const studyUpdatedPath = useSelector(selectStudyUpdated);

  const handleClick = (tab: string) => {
    const createNotifications = (events: NotificationDto[], type: string) => {
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
    setNotifications(currentNotifications);
    setActiveTab(tab);
  };

  useEffect(() => {
    handleClick("All");
  }, []);

  return (
    <S.Notification_Header_style>
      <S.Notification_HeaderItem_style
        onClick={() => handleClick("All")}
        isActive={activeTab === "All"}
      >
        All
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style
        isActive={activeTab === "StudyCreated"}
        onClick={() => handleClick("StudyCreated")}
      >
        Created
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style
        isActive={activeTab === "StudyUpdated"}
        onClick={() => handleClick("StudyUpdated")}
      >
        Updated
      </S.Notification_HeaderItem_style>
    </S.Notification_Header_style>
  );
};

export default NotificationHeader;
