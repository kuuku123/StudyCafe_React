import styled from "styled-components";
/* Style for messages sent by the current user */
export const ChatMessageMe = styled.div`
  background: #dcf8c6;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 5px 0;
  text-align: left;
  align-self: flex-end;
  display: inline-block; /* Allow bubble to shrink/grow with content */
  max-width: 80%; /* Prevent it from getting too wide */
  word-wrap: break-word; /* Break long words if necessary */
  overflow-wrap: break-word;
  white-space: pre-wrap; /* Preserves newlines and whitespace */
`;

/* Style for messages sent by the other study member */
export const ChatMessageOther = styled.div`
  background: #f1f0f0;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 5px 0;
  text-align: left;
  align-self: flex-start;
  display: inline-block; /* Allow bubble to shrink/grow with content */
  max-width: 80%; /* Prevent it from getting too wide */
  word-wrap: break-word; /* Break long words if necessary */
  overflow-wrap: break-word;
  white-space: pre-wrap; /* Preserves newlines and whitespace */
`;
