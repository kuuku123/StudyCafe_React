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

export const ProfileCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const ProfilePicture = styled.div`
  margin-bottom: 1.5rem;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #f8fafc;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const ProfileName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

export const ProfileBio = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;

  .icon {
    color: #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: #e0e7ff;
    border-radius: 50%;
  }

  .details {
    display: flex;
    flex-direction: column;

    span.label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    span.value, a.value {
      font-size: 1rem;
      color: #1e293b;
      font-weight: 500;
      text-decoration: none;
    }

    a.value:hover {
      text-decoration: underline;
      color: #4338ca;
    }
  }
`;

export const EditButton = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    background-color: #6366f1;
    color: white;
    font-weight: 600;
    border-radius: 9999px;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);

    &:hover {
      background-color: #4f46e5;
      transform: translateY(-2px);
      box-shadow: 0 6px 8px -1px rgba(99, 102, 241, 0.5);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
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
