import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DropDownContainer from "./DropDownContainer";
import * as S from "./Component_style";
import RoutesEnum from "../lib/RoutesEnum";
import Logout from "./Logout";
import { CgProfile } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Bell from "./Bell/Bell";
import { sseService } from "../lib/features/SSEService";

const Title = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return (
      <S.Title_style>
        <S.Children_style>
          <Link to="/">
            <S.Header_Image_style src="/images/image.png"></S.Header_Image_style>
          </Link>
          {children}
        </S.Children_style>
        <S.Login_Signup_style>
          <Bell></Bell>
          <DropDownContainer profile={<FaBookOpen size={"22px"}></FaBookOpen>}>
            <li>
              <Link style={S.link_style} to={RoutesEnum.CREATE_STUDY}>
                create study
              </Link>
            </li>
            <li>
              <Link style={S.link_style} to={RoutesEnum.JOIN_STUDY}>
                join study
              </Link>
            </li>
          </DropDownContainer>
          <DropDownContainer profile={<CgProfile size={"22px"}></CgProfile>}>
            <li>
              <Link style={S.link_style} to={RoutesEnum.PROFILE}>
                Profile
              </Link>
            </li>
            <li>
              <Link style={S.link_style} to={RoutesEnum.MY_STUDY_LIST}>
                Study
              </Link>
            </li>
            <li>
              <Logout style={S.link_style}></Logout>
            </li>
          </DropDownContainer>
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
          Login
        </Link>
        <Link style={S.link_style} to="/sign-up">
          Sign-Up
        </Link>
      </S.Login_Signup_style>
    </S.Title_style>
  );
};

export default Title;
