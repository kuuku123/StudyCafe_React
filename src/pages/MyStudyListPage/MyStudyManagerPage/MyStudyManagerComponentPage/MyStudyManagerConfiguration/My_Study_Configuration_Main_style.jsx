import styled from "styled-components";

export const Study_Select_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-self: flex-start;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  grid-row-start: 3;
  grid-row-end: 8;
  grid-column-start: 6;
  grid-column-end: 11;
  height: 100%;
  width: 100%;
`;

export const Study_List_style = styled.div`
  display: flex;
  justify-content: center;
  grid-row-start: 3;
  grid-row-end: 8;
  grid-column-start: 2;
  grid-column-end: 5;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 2px;
  margin-right: 13px;
`;
export const Study_List_Element_style = styled.button`
  background-color: green;
  color: white;
  padding: 0.375rem 0.75rem;
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

export const Study_Select_style = styled.div`
  width: 80%;
`;

export const Study_Configuration_Description_style = styled.div`
  width: 100%;
  height: 100%;
  grid-row-start: 3;
  grid-row-end: 8;
  grid-column-start: 11;
  grid-column-end: 16;
`;
export const Selected_Items_Container_style = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Selected_Tags_Container_style = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const Selected_Zones_Container_style = styled.div`
  flex: 1;
`;

export const Tag_Pill_style = styled.div`
  display: inline-block;
  background-color: #e0f7fa;
  color: #00796b;
  border-radius: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const Zone_Pill_style = styled.div`
  display: inline-block;
  background-color: #e1bee7;
  color: #6a1b9a;
  border-radius: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
`;
