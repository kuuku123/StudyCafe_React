import styled from "styled-components";

export const Profile_Edit_style = {
  gridRowStart: "2",
  gridRowEnd: "7",
  gridColumnStart: "6",
  gridColumnEnd: "12",
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
export const Profile_Image_style = styled.figure`
  grid-row-start: 2;
  grid-row-end: 6;
  grid-column-start: 14;
  grid-column-end: 16;
`;
export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none; /* Remove the default focus outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  height: auto;
`;
