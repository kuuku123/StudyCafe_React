import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../lib/features/WSService";
import * as S from "./ChatProfile_style";
import { AccountDto, User } from "../../utils/type";
import ProfileApi from "../../lib/apis/ProfileApi";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";
import { useDispatch, useSelector } from "react-redux";
import { selectChatProfileByEmail } from "../../lib/features/redux/chatProfileCacheSelector";
import { setCacheProfile } from "../../lib/features/redux/chatProfileCacheSlice";

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

  const dispatch = useDispatch();
  const chatProfileCache = useSelector(selectChatProfileByEmail(msg.email));

  const profileRef = useRef<HTMLImageElement>(null);
  const calculateCurrentPosition = () => {
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
    const fetchProfileData = async () => {
      try {
        const chatResponse = await ProfileApi.fetchProfile(msg.email);
        const managerResponse = await StudyManagerApi.isManager(
          msg.studyPath,
          msg.email
        );

        // Update local state
        setProfile(chatResponse.data);
        setIsManager(managerResponse.data);

        // Dispatch combined data to update the Redux cache
        dispatch(
          setCacheProfile({
            email: msg.email,
            profile: {
              accountDto: chatResponse.data,
              isManager: managerResponse.data,
            },
          })
        );
      } catch (error) {
        console.error("Error fetching chat profile data", error);
      }
    };
    if (chatProfileCache) {
      console.log("cached =>");
      setProfile(chatProfileCache.accountDto);
      setIsManager(chatProfileCache.isManager);
    } else {
      fetchProfileData();
    }
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
