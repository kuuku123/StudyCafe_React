import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import DropDownContainer from "./DropDownContainer";

const Title = ({ children }) => {
  const Title_style = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    background-color: #c2b4b4;
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

  const link_style = {
    color: "#004080",
    textDecoration: "none",
  };

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const isLogin = sessionStorage.getItem("login");
    if (isLogin === "success") {
      setLogin(true);
    } else if (isLogin === null) {
      setLogin(false);
    }
  }, []);

  if (login) {
    return (
      <Title_style>
        <Children_style>{children}</Children_style>
        <Login_Signup_style>
          <div>bell</div>
          <div>create study</div>
          <DropDownContainer setLogin={setLogin}></DropDownContainer>
        </Login_Signup_style>
      </Title_style>
    );
  }
  return (
    <Title_style>
      <Children_style>{children}</Children_style>
      <Login_Signup_style>
        <Link style={link_style} to="/login">
          로그인
        </Link>
        <Link style={link_style} to="/sign-up">
          가입
        </Link>
      </Login_Signup_style>
    </Title_style>
  );
};

export default Title;
