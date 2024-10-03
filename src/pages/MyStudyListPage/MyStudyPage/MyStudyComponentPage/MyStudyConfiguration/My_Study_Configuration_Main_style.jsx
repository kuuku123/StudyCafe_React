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
  grid-column-start: 2;
  grid-column-end: 9;
  height: 100%;
  width: 100%;
`;

export const Study_Select_style = styled.div`
  width: 80%;
`;

export const Study_Configuration_Description_style = styled.div`
  width: 100%;
  height: 100%;
  grid-row-start: 3;
  grid-row-end: 8;
  grid-column-start: 10;
  grid-column-end: 14;
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