import styled from "styled-components";

export const signup_input_style = {
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
export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none; /* Remove the default focus outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  height: auto;
`;
export const Signup_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40vh;
`;
export const Signup_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;
export const SignUp_Button_style = styled.button`
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

interface EmailVerifyButtonProps {
  clickable: boolean;
}

export const Email_Verfiy_Button = styled.button<EmailVerifyButtonProps>`
  padding: 8px 16px;
  margin: 8px 0;
  border: 2px solid ${({ clickable }) => (clickable ? "#007BFF" : "#cccccc")};
  background-color: ${({ clickable }) => (clickable ? "#007BFF" : "#f0f0f0")};
  color: ${({ clickable }) => (clickable ? "#fff" : "#999")};
  border-radius: 4px;
  font-size: 1rem;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  opacity: ${({ clickable }) => (clickable ? 1 : 0.6)};
  pointer-events: ${({ clickable }) => (clickable ? "auto" : "none")};
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: ${({ clickable }) =>
      clickable ? "#0056b3" : "#f0f0f0"};
    border-color: ${({ clickable }) => (clickable ? "#0056b3" : "#cccccc")};
  }
`;