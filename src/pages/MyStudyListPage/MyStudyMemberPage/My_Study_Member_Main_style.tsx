import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const JoinBadge = styled.div<{ joined: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.joined 
    ? 'rgba(239, 68, 68, 0.1)' 
    : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'};
  color: ${props => props.joined ? '#ef4444' : 'white'};
  border: 1px solid ${props => props.joined 
    ? 'rgba(239, 68, 68, 0.2)' 
    : 'transparent'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    ${props => props.joined && 'background: rgba(239, 68, 68, 0.15);'}
  }
`;

export const TabList = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? '#6366f1' : '#64748b'};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#6366f1' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.05);
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  min-height: 400px;
  width: 100%;
`;

// Legacy support
export const Grid_Container_style = Container;
export const Study_Title_style = TitleSection;
export const Study_Draft_style = styled.div`display: flex; gap: 1rem;`;
export const Study_Link_style = TabList;
export const Study_Component_Click_style = Tab;
export const Study_Link_Horizontal_Line_style = styled.div`display: none;`;
export const Header_Input_style = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  outline: none;
  &:focus { border-color: #6366f1; }
`;
