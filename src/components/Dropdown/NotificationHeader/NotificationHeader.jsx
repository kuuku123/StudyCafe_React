import React from "react";
import * as S from "./NotificationHeader_style";

const NotificationHeader = () => {
  const handleClick = () => {};

  return (
    <S.Notification_Header_style>
      <S.Notification_HeaderItem_style onClick={handleClick}>
        All
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style>
        Study Created
      </S.Notification_HeaderItem_style>
      <S.Notification_HeaderItem_style>
        Study Updated
      </S.Notification_HeaderItem_style>
    </S.Notification_Header_style>
  );
};

export default NotificationHeader;
