import React from "react";
import * as S from "./Bell_style";
import { useSelector } from "react-redux";

const Bell = () => {

  const {count} = useSelector((state) => state.notifications.messages);

  
  return (
    <S.BellIconWrapper>
      <S.BellIcon />
      {count > 0 && <S.NotificationBadge>{count}</S.NotificationBadge>}
    </S.BellIconWrapper>
  );
};

export default Bell;
