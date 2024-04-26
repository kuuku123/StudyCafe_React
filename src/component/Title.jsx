import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

const Title = ({ children }) => {
  const Title_style = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    background-color: black;
  `;

  const Children_style = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  `;
  const Login_Signup_style = styled.div`
    display: flex;
    flex-direction: row;
    color: gray;
    gap: 10px;
    margin-right: 10px;
  `;

  const LogOut_Button_style = styled.button`
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
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("login");
    if (isLogin === "success") {
      setLogin(true);
    } else if (isLogin === null) {
      setLogin(false);
    }
  }, []);

  handleLogout = () => {
    localStorage.removeItem("login")
    
    setLogin(false)
  }

  if (login) {
    return (
      <Title_style>
        <Children_style>{children}</Children_style>
        <Login_Signup_style>
          <LogOut_Button_style>
            <h3>로그아웃</h3>
          </LogOut_Button_style>
        </Login_Signup_style>
      </Title_style>
    );
  }
  return (
    <Title_style>
      <Children_style>{children}</Children_style>
      <Login_Signup_style>
        <Link to="/login">
          <h3>로그인</h3>
        </Link>
        <Link to="/sign-up">
          <h3>가입</h3>
        </Link>
      </Login_Signup_style>
    </Title_style>
  );
};

export default Title;
