import styled from "styled-components";

export const Profile_Select_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const Profile_Select_style = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const Profile_Configuration_Description_style = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  color: #475569;
  line-height: 1.6;
`;

export const Selected_Items_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Selected_Tags_Container_style = styled.div`
  flex: 1;
`;

export const Selected_Zones_Container_style = styled.div`
  flex: 1;
`;

export const Tag_Pill_style = styled.div`
  display: inline-block;
  background-color: #e0f7fa;
  color: #00796b;
  border-radius: 9999px;
  padding: 0.375rem 0.875rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Zone_Pill_style = styled.div`
  display: inline-block;
  background-color: #e1bee7;
  color: #6a1b9a;
  border-radius: 9999px;
  padding: 0.375rem 0.875rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
