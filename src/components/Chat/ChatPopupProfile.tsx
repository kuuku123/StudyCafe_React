import React from "react";
import ReactDOM from "react-dom";
import * as S from "./ChatPopupProfile_style";
import { AccountDto } from "../../utils/type";
interface ChatPopupProfileType {
  profile: AccountDto;
  closePopupProfile: () => void;
  popupPosition: { top: number; left: number };
}
const ChatPopupProfile: React.FC<ChatPopupProfileType> = ({
  profile,
  closePopupProfile: closePopup,
  popupPosition,
}) => {
  console.log("popupPostion => ", popupPosition);

  return ReactDOM.createPortal(
    <S.ChatPopupProfileContainer
      style={{
        top: `${popupPosition.top - 300}px`,
        left: `${popupPosition.left - 300}px`,
      }}
    >
      ChatPopupProfile
      <S.CloseButton onClick={closePopup}>X</S.CloseButton>
      <S.ChatPopupProfileImg
        src={profile ? "data:image/png;base64," + profile.profileImage : ""}
      ></S.ChatPopupProfileImg>
      <S.ChatPopupProfileLink href={profile.url}>
        {profile.url || "default url"}
      </S.ChatPopupProfileLink>
    </S.ChatPopupProfileContainer>,
    document.body
  );
};

export default ChatPopupProfile;
