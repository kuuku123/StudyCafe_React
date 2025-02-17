import React from "react";
import * as S from "./ChatMessage_style";
import { useSelector } from "react-redux";

const ChatMessage = ({ sender, children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user.nickname === sender) {
    return <S.ChatMessageMe>{children}</S.ChatMessageMe>;
  } else {
    return <S.ChatMessageOther>{children}</S.ChatMessageOther>;
  }
};

export default ChatMessage;
