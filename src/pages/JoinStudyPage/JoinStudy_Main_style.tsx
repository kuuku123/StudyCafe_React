import styled from "styled-components";

export const Header_Input_style = styled.input`
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const StudyListContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  padding: 40px 20px;
  gap: 40px;
  align-items: flex-start;
`;

export const FiltersContainer = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  position: sticky;
  top: 100px;
`;

export const StudyResultsContainer = styled.div`
  flex: 1;
`;

export const StudyCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: white;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #6366f1;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
`;

export const ShortDescription = styled.p`
  margin: 0;
  color: #64748b;
  line-height: 1.6;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  padding: 4px 12px;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const Zones = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Zone = styled.span`
  padding: 4px 12px;
  background-color: rgba(168, 85, 247, 0.1);
  color: #a855f7;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;

export const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background: white;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  height: 40px;
  min-width: 40px;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #6366f1;
    color: #6366f1;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: #6366f1;
    color: white;
    border-color: #6366f1;
  }
`;