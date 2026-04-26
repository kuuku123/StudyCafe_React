import styled from "styled-components";

export const Notification_Header_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.25rem;
  background-color: #f1f5f9;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;

interface NotificationHeaderItemProps {
  isActive: boolean;
}

export const Notification_HeaderItem_style = styled.button<NotificationHeaderItemProps>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  background-color: ${(props) => (props.isActive ? "#6366f1" : "transparent")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#64748b")};
  box-shadow: ${(props) => (props.isActive ? "0 4px 6px -1px rgba(99, 102, 241, 0.4)" : "none")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#4f46e5" : "#e2e8f0")};
    color: ${(props) => (props.isActive ? "#ffffff" : "#1e293b")};
  }

  &:active {
    transform: translateY(1px);
  }
`;
