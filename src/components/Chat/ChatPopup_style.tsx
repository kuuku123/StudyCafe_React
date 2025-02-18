import styled from "styled-components";

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  font-family: Arial, sans-serif;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  background: #007bff;
  color: #fff;
  padding: 10px;
  position: relative; /* Needed for absolute positioning of MinimizeButton */
  display: flex;
  flex-direction: column;
`;

export const StudyList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

interface StudyItemProps {
  active?: boolean;
}

export const StudyItem = styled.div<StudyItemProps>`
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  background: ${({ active }) => (active ? "#0056b3" : "transparent")};
  &:hover {
    background: #0056b3;
  }
`;

export const MinimizeButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #007bff;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  flex: 1;
`;

export const StudyTitle = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`;

export const ToggleButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
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
