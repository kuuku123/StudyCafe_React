import styled from "styled-components";

export const Grid_Container_style = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 1fr);
  min-height: 80vh;
  justify-items: center;
  align-items: center;
`;
export const Profile_List_style = styled.div`
  display: flex;
  grid-row-start: 2;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
  flex-direction: column;
  gap: 2px;
  margin-right: 13px;
`;
export const Profile_List_Element_style = styled.button`
  background-color: green;
  color: white;
  padding: 0.375rem 0.75rem;
  width: 300px;
  font-size: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  /* Hover effect */
  &:hover {
    background-color: #0056b3;
  }

  /* Active effect */
  &:active {
    background-color: #004080;
  }

  /* Disabled styles */
  &:disabled {
    background-color: #b3b3b3;
    color: #666666;
    cursor: not-allowed;
  }
`;

export const Profile_Edit_style = {
  gridRowStart: "2",
  gridRowEnd: "7",
  gridColumnStart: "2",
  gridColumnEnd: "4",
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
export const Profile_Image_style = styled.figure`
  grid-row-start: 2;
  grid-row-end: 6;
  grid-column-start: 4;
  grid-column-end: 5;
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
