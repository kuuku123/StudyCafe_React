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
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
`;

export const Title_style = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: #c2b4b4;
  width: 100%;
  min-width: 1400px;
`;

export const Children_style = styled.div`
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
`;

export const Header_Image_style = styled.img`
  width: 70px; /* Set the width of the image */
  height: auto; /* Maintain aspect ratio */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add shadow effect */
`;
