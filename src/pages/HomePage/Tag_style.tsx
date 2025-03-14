import styled from "styled-components";

export const Tag_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
  padding-bottom: 5px;
  position: relative; /* Needed for absolute positioning of the pseudo-element */

  /* Create the pseudo-element for the underline */
  &::after {
    content: "";
    position: absolute;
    bottom: 0; /* position it at the bottom */
    left: 0;
    width: 0%;
    height: 2px; /* desired underline thickness */
    background-color: currentColor; /* matches the text color */
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
  }
`;
