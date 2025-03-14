import React, { useState } from "react";
import * as S from "./Bell_style";
import { useSelector } from "react-redux";
import { selectMessagesCount } from "../../lib/features/redux/notificationSelector";

const Bell = () => {
  const studyCount = useSelector(selectMessagesCount);
  console.log("StudyCount => ", studyCount);
  const totalCount = studyCount;

  return (
    <S.BellIconWrapper>
      <S.BellIcon />
      {totalCount > 0 && (
        <S.NotificationBadge>{totalCount}</S.NotificationBadge>
      )}
    </S.BellIconWrapper>
  );
};

export default Bell;
