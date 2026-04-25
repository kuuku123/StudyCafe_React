import styled from "styled-components";

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Study_Picture_style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  img {
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1/1;
  }

  figcaption {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }
`;

export const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Study_ShortDescription_style = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }
  div {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #475569;
  }
`;

export const Study_FullDescription_style = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }
  .content {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    max-height: 400px;
    overflow-y: auto;
    font-size: 1rem;
    line-height: 1.7;
    color: #334155;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
  }
`;
