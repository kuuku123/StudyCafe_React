import styled from "styled-components";

export const Header_Input_style = styled.input`
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const Homeapge_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 80vh;
  padding-top: 40px;
`;

export const Tags_wrapper = styled.div`
  position: sticky;
  top: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 3;
  border-bottom: 1px solid #f1f5f9;
`;

export const Tags_style = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: #6366f1;
    color: white;
    border-color: #6366f1;
  }
`;

export const Email_Verification_style = styled.div`
  font-size: 16px;
  color: #6366f1;
  margin-bottom: 10px;
`;

export const Home_Title_style = styled.h1`
  font-size: clamp(3rem, 10vw, 80px);
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  padding-bottom: 10px;
`;

export const Home_Intro_style = styled.h2`
  font-size: clamp(1rem, 3vw, 24px);
  font-weight: 400;
  color: #64748b;
  max-width: 800px;
  text-align: center;
  line-height: 1.5;
  margin-top: 10px;
`;

