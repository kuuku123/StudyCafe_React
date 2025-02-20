import React, { ReactNode } from "react";
import * as S from "./ChatMessage_style";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/redux/authSelector";

interface ChatMessageProps {
  sender: string;
  children: ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, children }) => {
  const { user } = useSelector(selectAuth);
  if (user && user.email === sender) {
    return <S.ChatMessageMe>{children}</S.ChatMessageMe>;
  }
  return <S.ChatMessageOther>{children}</S.ChatMessageOther>;
};

export default ChatMessage;
