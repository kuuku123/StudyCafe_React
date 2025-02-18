import styled from "styled-components";

export const Grid_Container_style = styled.div`
  display: grid;
  grid-template-columns: repeat(18, 100px);
  grid-template-rows: repeat(8, 100px);
  min-height: 80vh;
  justify-items: center;
  align-items: center;
`;
export const Profile_List_style = styled.div`
  display: flex;
  grid-row-start: 2;
  grid-row-end: 5;
  grid-column-start: 3;
  grid-column-end: 4;
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

export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none; /* Remove the default focus outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  height: auto;
`;
