import styled from "styled-components";

export const ChatPopupProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #000; /* This adds a 4px thick black border */
  z-index: 5;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const ChatPopupProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px; /* Slight rounding */
  object-fit: cover; /* Ensures the image covers the container */
  flex-shrink: 0;
`;

export const ChatPopupProfileLink = styled.a`
  
`