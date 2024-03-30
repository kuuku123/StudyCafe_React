import React from "react";
import styled from "styled-components";

const Title = ({ loginUrl = "", children }) => {
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
  console.log("Title", children);
  if (loginUrl) {
    return <h1>{children}</h1>;
  }
  return (
    <Title_style>
      <Children_style>{children}</Children_style>
      <Login_Signup_style>
        <h3>로그인</h3>
        <h3>가입</h3>
      </Login_Signup_style>
    </Title_style>
  );
};

export default Title;
