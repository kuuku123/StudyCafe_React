import React from "react";
import styled from "styled-components";

const Profile_Main = () => {
  const Column_style = styled.div`
    display: flex;
  `;

  const Left_Column_style = styled.div`
    display: flex;
    flex: 4; /* 3 parts out of 10 */
    align-items: center;
    justify-content: center;
  `;

  const Right_Column_style = styled.div`
    display: flex;
    flex: 6; /* 7 parts out of 10 */
    align-items: center;
    justify-content: center;
  `;

  return (
    <div>
      <Column_style>
        <Left_Column_style>left</Left_Column_style>
        <Right_Column_style>right</Right_Column_style>
      </Column_style>
    </div>
  );
};

export default Profile_Main;
