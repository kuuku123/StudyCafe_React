import React from 'react';
import styled from 'styled-components';

const NotificationWrapper = styled.div`
  position: absolute;
  z-index: 10000;
  right: 1px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const NotificationHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
`;

const Notification_Main = ({name,children}) => {
  return (
    <NotificationWrapper>
      <NotificationHeader>{name}</NotificationHeader>
      <NotificationItem>{children}</NotificationItem>
    </NotificationWrapper>
  );
};

export default Notification_Main;
