import styled from "styled-components";

export const Signup_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  padding: 2rem;
  background-color: #f8fafc;
`;

export const SignupCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1.5rem;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

export const SignupTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

export const SignUp_Button_style = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  background-color: #6366f1;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
  margin-top: 1rem;

  &:hover {
    background-color: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  height: auto;
`;

export const Signup_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;

export const signup_input_style = {}; // Legacy support
