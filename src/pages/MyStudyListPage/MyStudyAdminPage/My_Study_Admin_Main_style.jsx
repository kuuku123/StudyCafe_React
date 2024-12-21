import styled from "styled-components";

export const Grid_Container_style = styled.div`
  display: grid;
  grid-template-columns: repeat(18, 100px);
  grid-template-rows: repeat(8, 100px);
  min-height: 80vh;
  justify-items: center;
  align-items: center;
`;

export const Study_Component_Click_style = styled.span`
  font-size: ${(props) => props.fontSize || "22px"};
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.5s ease;
  transform: ${(props) => (props.clicked ? "scale(1.6)" : "scale(1)")};

  &:hover {
    transform: scale(1.6);
  }
`;
export const Study_Title_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  width: 100%;
`;

export const Study_Link_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 7;
  width: 100%;
`;

export const Study_Draft_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 10;
  grid-column-end: 14;
  width: 100%;
`;

export const Study_Link_Horizontal_Line_style = styled.div`
  background-color: black; /* Color of the line */
  height: 2px; /* Thickness of the line */
  grid-row-start: 3;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 15;
  align-self: self-start;
  width: 100%;

  position: relative; /* Use relative positioning */
  top: -30%; /* Move the line up slightly, making it higher within the row */
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

export const CreateStudy_Main_style = styled.div`
  text-align: center;
`;
