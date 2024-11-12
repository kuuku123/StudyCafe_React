import styled from "styled-components";

export const Profile_Password_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  grid-row-start: 2;
  grid-row-end: 5;
  grid-column-start: 6;
  grid-column-end: 11;
`;

export const Profile_Password_Title_style = styled.div`
font-size: 30px;
  align-self: center;
`;

export const Set_Password_Input_style = {
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
  outline: "none",
  transition: "border-color 0.3s ease",
  height: "auto",
  marginTop: "10px",
  padding: "0.375rem 0.75rem",
  width: "600px",
};

export const Set_Password_Button_style = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
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
