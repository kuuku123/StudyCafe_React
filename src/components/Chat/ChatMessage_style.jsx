import styled from "styled-components";
/* Style for messages sent by the current user */
export const ChatMessageMe = styled.div`
  background: #dcf8c6;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 5px 0;
  text-align: right;
  align-self: flex-end;
`;

/* Style for messages sent by the other study member */
export const ChatMessageOther = styled.div`
  background: #f1f0f0;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 5px 0;
  text-align: left;
  align-self: flex-start;
`;