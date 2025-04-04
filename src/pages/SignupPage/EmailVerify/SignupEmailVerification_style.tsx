import styled from "styled-components";

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
    background-color: ${({ clickable }) => (clickable ? "#0056b3" : "#f0f0f0")};
    border-color: ${({ clickable }) => (clickable ? "#0056b3" : "#cccccc")};
  }
`;

export const Email_Resend_Button = styled.button`
  padding: 8px 16px;
  margin: 8px 0;
  border: 2px solid "#007BFF";
  background-color: "#007BFF";
  color: "#fff";
  border-radius: 4px;
  font-size: 1rem;
  cursor: "pointer";
  transition: background-color 0.2s ease, border-color 0.2s ease;
`;

export const Code_Input = styled.input`
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  height: auto;
  margin-top: 10px;
  padding: 0.375rem 0.75rem;
  width: 600px;
`;

export const Hidden_Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 2px solid gray;
`;

export const Hidden_Button_Container = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

export const Verified_Success = styled.div`
  background-color: lightgreen;
  font-size: 13px;
`
