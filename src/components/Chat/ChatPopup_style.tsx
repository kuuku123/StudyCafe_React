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

