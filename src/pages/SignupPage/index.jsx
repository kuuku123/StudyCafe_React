import React from "react";
import styled from "styled-components";
import Page from "../../component/Page";
import Title from "../../component/Title";
import CopyRight from "../../component/CopyRight";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const Header_Input_style = styled.input`
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none; /* Remove the default focus outline */
    transition: border-color 0.3s ease; /* Smooth transition for border color */
    height: auto;
  `;
  const Header_Image_style = styled.img`
    width: 70px; /* Set the width of the image */
    height: auto; /* Maintain aspect ratio */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  `;
  const Signup_Input_style = styled(Header_Input_style)`
    margin-top: 10px;
    padding: 0.375rem 0.75rem;
    width: 600px;
  `;
  const Signup_Main_style = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40vh;
  `;
  const Signup_Container_style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  `;
  const SignUp_Button_style = styled.button`
    background-color: #007bff;
    color: white;
    padding: 0.375rem 0.75rem;
    width: 600px;
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
    <div>
      <Page
        header={
          <Title>
            <Link to="/">
              <Header_Image_style src="/images/image.png"></Header_Image_style>
            </Link>
            <Header_Input_style></Header_Input_style>
          </Title>
        }
        footer={<CopyRight></CopyRight>}
      >
        <Signup_Main_style>
          <Signup_Container_style>
            <h1>계정 만들기</h1>
          </Signup_Container_style>
          <Signup_Container_style>
            <label htmlFor="nickName">닉네임</label>
            <Signup_Input_style id="nickName"></Signup_Input_style>
          </Signup_Container_style>
          <Signup_Container_style>
            <label htmlFor="email">이메일</label>
            <Signup_Input_style id="email"></Signup_Input_style>
          </Signup_Container_style>
          <Signup_Container_style>
            <label htmlFor="password">패스워드</label>
            <Signup_Input_style
              type="password"
              id="password"
            ></Signup_Input_style>
          </Signup_Container_style>
          <Signup_Container_style>
            <SignUp_Button_style>가입 하기</SignUp_Button_style>
          </Signup_Container_style>
        </Signup_Main_style>
      </Page>
    </div>
  );
};

export default SignupPage;
