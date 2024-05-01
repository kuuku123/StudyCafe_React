import React from 'react'
import styled from "styled-components";
import Page from "../../component/Page";
import Title from "../../component/Title";
import LoginForm from './LoginForm';
import CopyRight from "../../component/CopyRight";
import { Link, useNavigate} from "react-router-dom";

const LoginPage = () => {
  
  const Header_Input_style = styled.input`
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
    height: auto;
  `;
  const Header_Image_style = styled.img`
    width: 70px;
    height: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  `;
  const Login_Main_style = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40vh;
  `;
  const Login_Container_style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  `;
  const Login_Button_style = styled.button`
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

  const navigate = useNavigate()
  const handleSubmit = async (loginInfo) => {
    const response = await fetch("http://localhost:8081/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    }).then((res) => res.json());
    console.log("response status", response.status)
    if (response.status === "OK") {
      console.log("redirect")
      sessionStorage.setItem("user", loginInfo.nicknameOrEmail)
      sessionStorage.setItem("login","success")
      navigate("/")
    }
    else {
      console.log(response.body)
      localStorage.removeItem("login")
      alert(response.body)
    }
  };

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
        <Login_Main_style>
          <Login_Container_style>
            <h1>로그인 하기</h1>
          </Login_Container_style>
          <LoginForm onSubmit={handleSubmit}></LoginForm>
          <Login_Container_style>
            <Login_Button_style type="submit" form="login-form">
              로그인
            </Login_Button_style>
          </Login_Container_style>
        </Login_Main_style>
      </Page>
    </div>
  );
};

export default LoginPage