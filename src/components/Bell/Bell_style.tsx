import { CgBell } from "react-icons/cg";
import styled from "styled-components";

export const BellIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const BellIcon = styled(CgBell)`
  font-size: 22px;
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
`;