import styled from "styled-components";

export const CopyRight_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DropDown_style = styled.ul`
  position: absolute;
  z-index: 100000;
  right: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

export const Li_style = styled.li`
  font-size: 24px;
  font-style: italic;
`;
export const link_style = {
  fontSize: "24px",
  color: "#004080",
  textDecoration: "none",
};

export const FormControl_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
`;

export const Title_style = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: #c2b4b4;
`;

export const Children_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
export const Login_Signup_style = styled.div`
  display: flex;
  flex-direction: row;
  color: gray;
  gap: 10px;
  margin-right: 10px;
`;

export const Header_Image_style = styled.img`
  width: 70px; /* Set the width of the image */
  height: auto; /* Maintain aspect ratio */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add shadow effect */
`;
