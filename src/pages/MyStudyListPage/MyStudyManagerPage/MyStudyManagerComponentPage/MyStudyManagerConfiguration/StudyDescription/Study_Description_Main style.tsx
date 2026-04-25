import styled from "styled-components";

export const Study_Description_Main_style = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`;

export const Study_Image_style = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  
  img {
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    height: auto;
  }

  input[type="file"] {
    font-size: 0.875rem;
    color: #64748b;
    cursor: pointer;
    
    &::file-selector-button {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: #e2e8f0;
      }
    }
  }

  figcaption {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }
`;
