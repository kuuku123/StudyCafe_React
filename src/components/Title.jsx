import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDownContainer from "./DropDownContainer";
import { CgBell } from "react-icons/cg";
import * as S from "./Component_style";

const Title = ({ children }) => {
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
      <S.Title_style>
        <S.Children_style>
          <Link to="/">
            <S.Header_Image_style src="/images/image.png"></S.Header_Image_style>
          </Link>
          {children}
        </S.Children_style>
        <S.Login_Signup_style>
          <CgBell size={"22px"}></CgBell>
          <Link to="create-study">
            <div style={{ fontSize: "22px" }}>create study</div>
          </Link>
          <DropDownContainer setLogin={setLogin}></DropDownContainer>
        </S.Login_Signup_style>
      </S.Title_style>
    );
  }
  return (
    <S.Title_style>
      <S.Children_style>
        <Link to="/">
          <S.Header_Image_style src="/images/image.png"></S.Header_Image_style>
        </Link>
        {children}
      </S.Children_style>
      <S.Login_Signup_style>
        <Link style={S.link_style} to="/login">
          로그인
        </Link>
        <Link style={S.link_style} to="/sign-up">
          가입
        </Link>
      </S.Login_Signup_style>
    </S.Title_style>
  );
};

export default Title;
