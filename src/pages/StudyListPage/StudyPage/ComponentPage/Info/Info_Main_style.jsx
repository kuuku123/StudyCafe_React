import styled from "styled-components";

export const Study_Picture_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  row-gap: 20px;
  width: 100%;
  height: 100%;
  grid-row-start: 3;
  grid-row-end: 9;
  grid-column-start: 2;
  grid-column-end: 9;
`;
export const Study_ShortDescription_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 10;
  grid-column-end: 16;
  /* Ensure scroll bar if content overflows */
`;
export const Study_FullDescription_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  grid-row-start: 4;
  grid-row-end: 8;
  grid-column-start: 10;
  grid-column-end: 16;
`;
