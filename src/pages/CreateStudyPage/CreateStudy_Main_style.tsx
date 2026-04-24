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

export const Grid_Container_style = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
`;

export const CreateStudy_Main_style = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 800px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 30px;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }
`;

export const Study_Image_style = styled.figure`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  position: sticky;
  top: 100px;

  img {
    width: 240px;
    height: 240px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  figcaption {
    font-weight: 600;
    color: #1e293b;
    font-size: 1.1rem;
  }

  input[type="file"] {
    font-size: 0.9rem;
    color: #64748b;
    width: 100%;
    
    &::-webkit-file-upload-button {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      color: #1e293b;
      margin-right: 12px;
      transition: all 0.2s ease;

      &:hover {
        background: #e2e8f0;
      }
    }
  }
`;
