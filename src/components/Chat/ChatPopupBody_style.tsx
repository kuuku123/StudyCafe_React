import styled from "styled-components";

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #007bff;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  max-height: 700px;
  overflow-y: auto;
  padding: 10px;
  flex: 1;
`;

export const StudyTitle = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`;

export const NoStudySelected = styled.div`
  padding: 10px;
  color: #777;
  text-align: center;
`;

/* New styles for input area */
export const ChatInputContainer = styled.div`
  display: flex;
  border-top: 1px solid #007bff;
  padding: 5px;
  background: #fff;
`;

export const ChatInput = styled.textarea`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  outline: none;
`;

export const SendButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  margin-left: 5px;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
`;
