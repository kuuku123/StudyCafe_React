import styled from "styled-components";

export const Tag_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 16px;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  color: #64748b;

  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.05);
  }

  span {
    font-size: 14px;
    font-weight: 500;
    margin-top: 4px;
  }

  /* Modern underline */
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 3px;
    background-color: #6366f1;
    border-radius: 3px 3px 0 0;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 60%;
  }
`;

