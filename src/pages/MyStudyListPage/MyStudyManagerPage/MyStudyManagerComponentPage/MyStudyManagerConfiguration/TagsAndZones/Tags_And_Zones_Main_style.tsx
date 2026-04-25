import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
`;

export const SelectionArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  min-height: 100px;
`;

export const Tag_Pill_style = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e0f7fa;
  color: #00796b;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 121, 107, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`;

export const Zone_Pill_style = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e1bee7;
  color: #6a1b9a;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid rgba(106, 27, 154, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`;

// Legacy support
export const Study_Select_Container_style = Container;
export const Study_Select_style = styled.div`width: 100%;`;
export const Study_Configuration_Description_style = Section;
export const Selected_Items_Container_style = SelectionArea;
export const Selected_Tags_Container_style = Section;
export const Selected_Zones_Container_style = Section;
