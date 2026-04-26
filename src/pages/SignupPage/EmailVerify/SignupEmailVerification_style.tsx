import styled from "styled-components";

interface EmailVerifyButtonProps {
  clickable: boolean;
}

export const Email_Verfiy_Button = styled.button<EmailVerifyButtonProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${({ clickable }) => (clickable ? "#6366f1" : "#f1f5f9")};
  color: ${({ clickable }) => (clickable ? "white" : "#94a3b8")};
  font-weight: 600;
  border: 1px solid ${({ clickable }) => (clickable ? "#6366f1" : "#e2e8f0")};
  border-radius: 0.75rem;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background-color: ${({ clickable }) => (clickable ? "#4f46e5" : "#f1f5f9")};
    transform: ${({ clickable }) => (clickable ? "translateY(-1px)" : "none")};
    box-shadow: ${({ clickable }) => (clickable ? "0 4px 6px -1px rgba(99, 102, 241, 0.4)" : "none")};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Email_Resend_Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #6366f1;
  font-weight: 600;
  border: 1px solid #6366f1;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f3ff;
    border-color: #4f46e5;
    color: #4f46e5;
  }
`;

export const Code_Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  text-align: center;
  letter-spacing: 0.25rem;
  font-weight: 700;

  &:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const Hidden_Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export const Hidden_Button_Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const Verified_Success = styled.div`
  background-color: #f0fdf4;
  color: #166534;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #bbf7d0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
