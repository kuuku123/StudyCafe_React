import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../lib/features/WSService";
import * as S from "./ChatProfile_style";
import { AccountDto, User } from "../../utils/type";
import ProfileApi from "../../lib/apis/ProfileApi";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";
import ChatPopupProfile from "./ChatPopupProfile";

interface ChatProfileProps {
  user: User;
  msg: ChatMessageType;
  children: ReactNode;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ user, msg, children }) => {
  const [profile, setProfile] = useState<AccountDto>();
  const [isManager, setIsManager] = useState<Boolean>(false);
  const [showChatPopupProfile, setShowChatPopupProfile] =
    useState<Boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const profileRef = useRef<HTMLImageElement>(null);
  const calculateCurrentPosition = (open: boolean) => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      // Adjust these values if you need an offset
      setPopupPosition({ top: rect.bottom, left: rect.left });
      setShowChatPopupProfile(open);
    }
  };
  const handleClick = () => {
    calculateCurrentPosition(true);
  };

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
    calculateCurrentPosition(false);
  }, []);

  const profileImg = (
    <S.ChatProfileImg
      ref={profileRef}
      src={profile ? "data:image/png;base64," + profile.profileImage : ""}
      onClick={handleClick}
    />
  );

  const popup = showChatPopupProfile && profile && (
    <ChatPopupProfile
      profile={profile}
      setShowChatPopupProfile={setShowChatPopupProfile}
      popupPosition={popupPosition}
    />
  );

  if (user && user.email === msg.email) {
    return (
      <S.ChatMessageProfileWrapperMe>
        {profileImg}
        {popup}
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
      {profileImg}
      {popup}
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
