import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as S from "./ChatPopupProfile_style";
import { AccountDto } from "../../utils/type";
import ProfileAccount_Main from "../../pages/ProfileSettingPage/ProfileComponent/ProfileAccountPage/ProfileAccount_Main";
interface ChatPopupProfileType {
  profile: AccountDto;
  setShowChatPopupProfile: React.Dispatch<React.SetStateAction<Boolean>>;
  popupPosition: { top: number; left: number };
}
const ChatPopupProfile: React.FC<ChatPopupProfileType> = ({
  profile,
  setShowChatPopupProfile,
  popupPosition,
}) => {
  console.log("popupPostion => ", popupPosition);
  const didMountRef = useRef(false);

  // This effect runs on every update.
  useEffect(() => {
    console.log("checking chatpopupprofile useeffect");
    if (didMountRef.current) {
      // If it's an update (i.e., not the first mount), close the popup.
      setShowChatPopupProfile(false);
    } else {
      didMountRef.current = true;
    }
  });

  return ReactDOM.createPortal(
    <S.ChatPopupProfileContainer
      style={{
        top: `${popupPosition.top - 300}px`,
        left: `${popupPosition.left - 300}px`,
      }}
    >
      ChatPopupProfile
      <S.CloseButton onClick={() => setShowChatPopupProfile((prev) => !prev)}>
        X
      </S.CloseButton>
      <S.ChatPopupProfileImg
        src={profile ? "data:image/png;base64," + profile.profileImage : ""}
      ></S.ChatPopupProfileImg>
      <S.ChatPopupProfileLink href={profile.url}>{profile.url || "default url"}</S.ChatPopupProfileLink>
    </S.ChatPopupProfileContainer>,
    document.body
  );
};

export default ChatPopupProfile;
