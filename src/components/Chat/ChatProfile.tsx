import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../lib/features/WSService";
import * as S from "./ChatProfile_style";
import { AccountDto, User } from "../../utils/type";
import ProfileApi from "../../lib/apis/ProfileApi";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";

interface ChatProfileProps {
  user: User;
  msg: ChatMessageType;
  children: ReactNode;
  openPopupForProfile: (
    profile: AccountDto,
    position: { top: number; left: number }
  ) => void;
  activePopupProfile: AccountDto | null;
  closePopupProfile: () => void;
}

const ChatProfile: React.FC<ChatProfileProps> = ({
  user,
  msg,
  children,
  openPopupForProfile,
  activePopupProfile,
  closePopupProfile,
}) => {
  const [profile, setProfile] = useState<AccountDto>();
  const [isManager, setIsManager] = useState<Boolean>(false);

  const profileRef = useRef<HTMLImageElement>(null);
  const calculateCurrentPosition = () => {
    console.log("calculateCurerntPosition ");
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      // Adjust these values if you need an offset
      openPopupForProfile(profile!, {
        top: rect.bottom,
        left: rect.left,
      });
    }
    if (activePopupProfile?.email === profile?.email) {
      closePopupProfile();
    }
  };
  const handleClick = () => {
    calculateCurrentPosition();
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
    calculateCurrentPosition();
  }, []);

  const profileImg = (
    <S.ChatProfileImg
      ref={profileRef}
      src={profile ? "data:image/png;base64," + profile.profileImage : ""}
      onClick={handleClick}
    />
  );

  if (user && user.email === msg.email) {
    return (
      <S.ChatMessageProfileWrapperMe>
        {profileImg}
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
