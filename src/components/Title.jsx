import React from "react";
import { Link } from "react-router-dom";
import DropDownContainer from "./DropDownContainer";
import NotificationDropDownElement from "./NotifcationDropDownElement";
import * as S from "./Component_style";
import RoutesEnum from "../lib/RoutesEnum";
import Logout from "./Logout";
import { CgProfile } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Bell from "./Bell/Bell";

const Title = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { studyCreatedPath, studyUpdatedPath } = useSelector((state) => {
    console.log("state ", state);
    return {
      studyCreatedPath: state.notifications.messages.studyCreated.study.path,
      studyUpdatedPath: state.notifications.messages.studyUpdated.study.path,
    };
  });

  const combinedPaths = [
    ...studyCreatedPath.map((path) => ({ path, type: "Created" })),
    ...studyUpdatedPath.map((path) => ({ path, type: "Updated" })),
  ];

  console.log("combinedPath => ", combinedPaths);

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
          <DropDownContainer profile={<Bell></Bell>}>
            {combinedPaths.length > 0 ? (
              <>
                {combinedPaths.map(({ path, type }, index) => (
                  <li key={`${type}-${index}`}>
                    <Link
                      style={S.link_style}
                      to={RoutesEnum.STUDY_MEMBER(path)}
                    >
                      <NotificationDropDownElement path={path} type={type} />
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <p style={S.link_style}>No Notifications</p>
            )}
          </DropDownContainer>
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
