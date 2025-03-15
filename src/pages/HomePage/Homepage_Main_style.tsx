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

export const Homeapge_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

export const Tags_wrapper = styled.div`
  position: sticky;
  top: 0;
  overflow: hidden; /* Hide the overflow */
  background: white; /* Ensure a background so content below doesn't show through */
  z-index: 3; /* Increase z-index if needed to overlay other content */
`;

export const Tags_style = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid;
  overflow-x: auto; /* Enable horizontal scroll if needed */
  scroll-behavior: smooth;
  /* Optionally hide the scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
`;
export const Email_Verification_style = styled.div`
  font-size: 20px;
`;

export const Home_Title_style = styled.h1`
  height: 100%;
  font-size: 100px;
`;
export const Home_Intro_style = styled.h2`
  height: 100%;
  font-size: 30px;
`;
