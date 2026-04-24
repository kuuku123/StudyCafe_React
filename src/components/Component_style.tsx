import styled, { CSSProperties } from "styled-components";

export const Page_style = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header_style = styled.header`
  // flex-shrink: 0; /* Keeps header in place */
`;

export const Main_style = styled.main`
  //flex-grow: 0; /* Allows main to take up available space */
`;

export const Footer_style = styled.footer`
  //flex-shrink: 0; /* Keeps footer in place */
`;

export const CopyRight_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NavItem_style = styled.div`
  position: relative;
`;

export const Li_style = styled.li`
  font-size: 24px;
  font-style: italic;
`;
export const link_style: CSSProperties = {
  fontSize: "22px",
  color: "#004080",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

export const FormControl_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  align-items: flex-start;
  width: 100%;

  .error {
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: 6px;
    font-weight: 500;
  }
`;

export const Label_style = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  display: block;

  .required {
    color: #ef4444;
    margin-left: 4px;
  }
`;

export const Input_style = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s ease;
  background: #f8fafc;

  &:focus {
    outline: none;
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;


export const Home_Header_style = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-width: 1400px;
  padding-bottom: 10px;
`;

export const App_Image_style = styled.div`
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
  margin-left: auto;
`;


export const Header_Image_style = styled.img`
  width: 70px; /* Set the width of the image */
  height: auto; /* Maintain aspect ratio */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add shadow effect */
`;
