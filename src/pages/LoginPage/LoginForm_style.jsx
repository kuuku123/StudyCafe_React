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
export const Login_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40vh;
`;
export const Login_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;
export const Login_Button_style = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.375rem 0.75rem;
  width: 600px;
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

export const Social_Login_Button_Container_style = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 30px;
  width: 600px;
`;
export const Social_Login_Button_style = styled.img`
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); /* Adjust shadow size and color */

  &:hover {
    transform: scale(1.2);
  }
`;

export const login_input_style = {
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
