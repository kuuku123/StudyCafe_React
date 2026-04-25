import styled, { CSSProperties } from "styled-components";

export const Profile_Edit_style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  width: "100%",
  maxWidth: "600px",
};

export const Profile_Image_style = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  
  img {
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #f8fafc;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  input[type="file"] {
    margin-top: 0.5rem;
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
