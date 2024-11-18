import React, { useState } from "react";
import * as S from "./Bell_style";

const Bell = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  return (
    <S.BellIconWrapper>
      <S.BellIcon />
      {notificationCount > 0 && (
        <S.NotificationBadge>{notificationCount}</S.NotificationBadge>
      )}
    </S.BellIconWrapper>
  );
};

export default Bell;
