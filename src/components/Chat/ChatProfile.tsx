import React, { ReactNode, useEffect, useState } from "react";
import { ChatMessageType } from "../../lib/features/WSService";
import * as S from "./ChatProfile_style";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/redux/authSelector";
import { AccountDto, User } from "../../utils/type";
import ProfileApi from "../../lib/apis/ProfileApi";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";

interface ChatProfileProps {
  user: User;
  msg: ChatMessageType;
  children: ReactNode;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ user, msg, children }) => {
  const [profile, setProfile] = useState<AccountDto>();
  const [isManager, setIsManager] = useState<Boolean>(false);

  useEffect(() => {
    if (user && user.email === msg.email) {
      ProfileApi.fetchMyProfile().then((response) => {
        setProfile(response.data);
      });
    } else {
      ProfileApi.fetchProfile(msg.email).then((response) => {
        setProfile(response.data);
      });
    }
    StudyManagerApi.isManager(msg.studyPath, msg.email).then((response) => {
      setIsManager(response.data);
    });
  }, []);

  if (user && user.email === msg.email) {
    return (
      <S.ChatMessageProfileWrapperMe>
        <S.ChatProfile
          src={profile ? "data:image/png;base64," + profile.profileImage : ""}
        ></S.ChatProfile>
        <S.ChatNicknameMessageWrapper>
          <S.ChatProfileNickname>
            {isManager ? `[M]${msg.nickname}` : msg.nickname}
          </S.ChatProfileNickname>
          {children}
        </S.ChatNicknameMessageWrapper>
      </S.ChatMessageProfileWrapperMe>
    );
  }
  return (
    <S.ChatMessageProfileWrapperOther>
      <S.ChatProfile
        src={profile ? "data:image/png;base64," + profile.profileImage : ""}
      ></S.ChatProfile>
      <S.ChatNicknameMessageWrapper>
        <S.ChatProfileNickname>
          {isManager ? `[M]${msg.nickname}` : msg.nickname}
        </S.ChatProfileNickname>
        {children}
      </S.ChatNicknameMessageWrapper>
    </S.ChatMessageProfileWrapperOther>
  );
};

export default ChatProfile;
