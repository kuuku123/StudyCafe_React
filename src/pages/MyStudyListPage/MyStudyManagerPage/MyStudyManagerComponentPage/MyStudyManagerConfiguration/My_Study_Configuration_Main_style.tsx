import styled from "styled-components";

export const ConfigContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  min-height: 500px;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(248, 250, 252, 0.5);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;

  @media (max-width: 968px) {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }
`;

export const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${props => props.active ? '#6366f1' : 'transparent'};
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#6366f1' : '#64748b'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: white;
    color: #6366f1;
    transform: translateX(4px);
  }

  @media (max-width: 968px) {
    white-space: nowrap;
    &:hover { transform: translateY(-2px); }
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Legacy support if needed
export const Study_List_style = Sidebar;
export const Study_List_Element_style = NavItem;
export const Study_Select_Container_style = MainContent;
export const Study_Configuration_Description_style = MainContent;
export const Tag_Pill_style = styled.div`
  display: inline-block;
  background-color: #e0f7fa;
  color: #00796b;
  border-radius: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
`;
export const Zone_Pill_style = styled.div`
  display: inline-block;
  background-color: #e1bee7;
  color: #6a1b9a;
  border-radius: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
`;
