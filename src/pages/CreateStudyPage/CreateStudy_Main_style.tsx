import styled from "styled-components";

export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none; /* Remove the default focus outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  height: auto;
`;

export const Grid_Container_style = styled.div`
  display: grid;
  grid-template-columns: repeat(18, 100px);
  grid-template-rows: repeat(8, 100px);
  min-height: 80vh;
  justify-items: center;
  align-items: center;
`;

export const CreateStudy_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-self: flex-start;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 4;
  grid-column-end: 11;
  width: 100%;
`;

export const Study_Image_style = styled.figure`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 11;
  grid-column-end: 16;
`;
