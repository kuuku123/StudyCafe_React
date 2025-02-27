import React, { ReactNode } from "react";
import { ChatMessageType } from "../../lib/features/WSService";
import * as S from "./ChatProfile_style";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/redux/authSelector";

interface ChatProfileProps {
  msg: ChatMessageType;
  children: ReactNode;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ msg, children }) => {
  const { user } = useSelector(selectAuth);
  if (user && user.email === msg.email) {
    return (
      <S.ChatMessageProfileWrapperMe>
        <S.ChatProfile></S.ChatProfile>
        <S.ChatNicknameMessageWrapper>
          <S.ChatProfileNickname>{msg.nickname}</S.ChatProfileNickname>
          {children}
        </S.ChatNicknameMessageWrapper>
      </S.ChatMessageProfileWrapperMe>
    );
  }
  return (
    <S.ChatMessageProfileWrapperOther>
      <S.ChatProfile></S.ChatProfile>
      <S.ChatNicknameMessageWrapper>
        <S.ChatProfileNickname>{msg.nickname}</S.ChatProfileNickname>
        {children}
      </S.ChatNicknameMessageWrapper>
    </S.ChatMessageProfileWrapperOther>
  );
};

export default ChatProfile;
