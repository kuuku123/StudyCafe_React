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

// Styling for layout
export const StudyListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  min-height: 80vh;
  padding: 20px;
  gap: 20px;
`;

export const FiltersContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StudyResultsContainer = styled.div`
  width: 70%;
`;

export const StudyCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0 0 10px;
`;

export const Tags = styled.div`
  display: flex;
  gap: 10px;
`;

export const Tag = styled.span`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 15px;
  font-size: 12px;
`;
export const Zones = styled.div`
  display: flex;
  gap: 10px;
`;

export const Zone = styled.span`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border-radius: 15px;
  font-size: 12px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;

  &:disabled {
    background-color: #ddd;
    color: #888;
    cursor: not-allowed;
  }

  &.active {
    background-color: #007bff;
    color: white;
  }
`;