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
import { sseService } from "../lib/features/SSEService";

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
    sseService.connect();
    return (
      <S.Title_style>
        <S.Children_style>
          <Link to="/">
            <S.Header_Image_style src="/images/image.png"></S.Header_Image_style>
          </Link>
          {children}
        </S.Children_style>
        <S.Login_Signup_style>
          <DropDownContainer profile={<Bell></Bell>} header={"Notification"}>
            {combinedPaths.map(({ path, type }, index) => (
              <Link style={S.link_style} to={RoutesEnum.STUDY_MEMBER(path)}>
                <li key={`${type}-${index}`}>
                  <NotificationDropDownElement path={path} type={type} />
                </li>
              </Link>
            ))}
          </DropDownContainer>
          <DropDownContainer
            profile={<FaBookOpen size={"22px"}></FaBookOpen>}
            header={"Study"}
          >
            <Link style={S.link_style} to={RoutesEnum.CREATE_STUDY}>
              <li>create study</li>
            </Link>
            <Link style={S.link_style} to={RoutesEnum.JOIN_STUDY}>
              <li>join study</li>
            </Link>
          </DropDownContainer>
          <DropDownContainer
            profile={<CgProfile size={"22px"}></CgProfile>}
            header={"Profile"}
          >
            <Link style={S.link_style} to={RoutesEnum.PROFILE}>
              <li>Profile</li>
            </Link>
            <Link style={S.link_style} to={RoutesEnum.MY_STUDY_LIST}>
              <li>Study</li>
            </Link>
            <Logout style={S.link_style}></Logout>
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
