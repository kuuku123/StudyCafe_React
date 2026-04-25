import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background-color: ${props => props.active ? "#e0e7ff" : "transparent"};
  color: ${props => props.active ? "#4338ca" : "#475569"};
  font-weight: ${props => props.active ? "600" : "500"};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.active ? "#e0e7ff" : "#f1f5f9"};
    color: ${props => props.active ? "#4338ca" : "#1e293b"};
  }
`;

export const ContentCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
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
