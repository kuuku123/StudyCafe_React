import styled from "styled-components";

export const Notification_Header_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface NotificationHeaderItemProps {
  isFirstHovered: boolean;
}

export const Notification_HeaderItem_style = styled.div<NotificationHeaderItemProps>`
  border-radius: 18px;
  background-color: ${(props) =>
    props.isFirstHovered
      ? "#f0f0f0"
      : "#fff"}; /* Default background color or "hover" for first render */
  color: ${(props) =>
    props.isFirstHovered
      ? "#333"
      : "inherit"}; /* Default text color or "hover" for first render */
  box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.4);
  padding: 10px;
  margin: 10px;
  width: 100%;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0; /* New background color on hover */
    color: #333; /* Optional: Change text color on hover */
  }
`;
