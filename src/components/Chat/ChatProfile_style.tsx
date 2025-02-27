import styled from "styled-components";

export const ChatMessageProfileWrapperMe = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
`;

export const ChatMessageProfileWrapperOther = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px 0;
`;

export const ChatProfile = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px; /* Slight rounding, remove if you want a sharp rectangle */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Hide any overflowing image content */
  flex-shrink: 0;
`;

export const ChatNicknameMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const ChatProfileNickname = styled.div`
  flex-shrink: 0;
  margin-right: 8px;
  margin-left: 8px;
  font-size: 0.85em;
  color: #555;
`;
