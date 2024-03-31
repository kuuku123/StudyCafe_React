import React from "react";
import styled from "styled-components";

const Hompage_Main = () => {
  const Homeapge_Main_style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
  `;
  const Homepage_Main_SignUp_Button_style = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    /* Hover effect */
    &:hover {
      background-color: #0056b3;
    }

    /* Active effect */
    &:active {
      background-color: #004080;
    }

    /* Disabled styles */
    &:disabled {
      background-color: #b3b3b3;
      color: #666666;
      cursor: not-allowed;
    }
  `;
  return (
    <Homeapge_Main_style>
      <h1>Welcome To Study Cafe</h1>
      <h2>
        태그와 지역 기반으로 스터디를 찾고 참여하세요. 스터디 모임 관리 기능을
        제공합니다.
      </h2>
      <Homepage_Main_SignUp_Button_style>
        회원 가입
      </Homepage_Main_SignUp_Button_style>
    </Homeapge_Main_style>
  );
};

export default Hompage_Main;
