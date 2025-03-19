import styled from "styled-components";

export const ChatHeaderAndBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const StudyListSidebar = styled.div`
  width: 100px; /* Adjust as needed */
  background: #f1f1f1;
  overflow-y: auto;
  padding: 10px;
  min-width: 100px;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StudyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
`;

export const StudyItem = styled.div<StudyItemProps>`
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  background: ${({ active }) => (active ? "#0056b3" : "transparent")};
  &:hover {
    background: #0056b3;
  }
`;

export const ChatHeader = styled.div`
  background: #007bff;
  color: #fff;
  padding: 10px;
  position: relative; /* Needed for absolute positioning of MinimizeButton */
  display: flex;
`;

interface StudyItemProps {
  active?: boolean;
}

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
