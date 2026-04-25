import styled from "styled-components";

export const MemberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.75rem;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`;

// Legacy support
export const Study_Manager_Picture_style = Section;
export const Study_Members_style = Section;
