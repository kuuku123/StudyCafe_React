import styled from "styled-components";

export const ChatPopupProfileContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: green;
  z-index: 1000;
`;


export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;