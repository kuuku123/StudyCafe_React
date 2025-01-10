import styled from "styled-components";

export const Notification_Header_style = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Notification_HeaderItem_style = styled.div`
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.4);
  padding: 10px;
  margin: 10px;
  width: 100%;
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition for background and text color */

  &:hover {
    background-color: #f0f0f0; /* New background color on hover */
    color: #333; /* Optional: Change text color on hover */
  }
`;
