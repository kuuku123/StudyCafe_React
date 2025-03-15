import styled from "styled-components";

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  font-family: Arial, sans-serif;
  z-index: 4;
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

export const ChatBubbleContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 0px;
  display: inline-block; /* Ensures container only takes the space of its content */
  transition: transform 0.2s ease; /* Smooth animation */
  z-index: 4;

  &:hover {
    transform: scale(1.25); /* Slightly larger on hover */
    cursor: pointer; /* Change cursor to pointer */
  }
`;

export const SpeechImage = styled.img`
  display: block;
`;

export const ImageText = styled.div`
  position: absolute;
  top: 40%; /* Adjust this value to position the text vertically */
  left: 50%; /* Adjust this value to position the text horizontally */
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  pointer-events: none; /* Ensures clicks pass through to underlying elements if needed */
`;
