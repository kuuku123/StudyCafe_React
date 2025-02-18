import styled from "styled-components";

export const DropDown_Header_style = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;

export const DropDown_style = styled.ul`
  position: absolute;
  z-index: 100000;
  right: 1rem;
  list-style: none;
  padding: 16px;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;

  li {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }
  /* Target only the first li element within DropDownContainer */

  button {
    display: block; /* Treat button as a block-level element */
    width: 100%; /* Make the button full width */
    padding: 8px 16px; /* Add padding to align with list items */
    text-align: left; /* Align text to the left */
    background-color: transparent; /* Remove default button background */
    border: none; /* Remove default button border */
    cursor: pointer; /* Change cursor to pointer on hover */

    &:hover {
      background-color: #f5f5f5; /* Change background color on hover */
    }
  }
`;
