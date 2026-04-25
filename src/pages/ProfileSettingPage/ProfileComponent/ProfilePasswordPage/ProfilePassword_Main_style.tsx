import styled from "styled-components";

export const Profile_Password_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  maxWidth: 600px;
`;

export const Profile_Password_Title_style = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

export const Set_Password_Input_style = {
  fontSize: "1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "0.5rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  height: "auto",
  marginTop: "0.5rem",
  padding: "0.75rem 1rem",
  width: "100%",
  maxWidth: "500px",
};

export const Set_Password_Button_style = styled.button`
  background-color: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  margin-top: 1rem;

  &:hover {
    background-color: #4f46e5;
  }

  &:active {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #cbd5e1;
    color: #64748b;
    cursor: not-allowed;
  }
`;
