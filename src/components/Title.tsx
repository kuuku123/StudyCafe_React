import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDownContainer from "./Dropdown/DropDownContainer";
import * as S from "./Component_style";
import RoutesEnum from "../lib/RoutesEnum";
import Logout from "./Logout";
import { CgProfile } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Bell from "./Bell/Bell";
import { sseService } from "../lib/features/SSEService";
import NotificationHeader from "./Dropdown/NotificationHeader/NotificationHeader";
import StudyCreatedEvent from "./Dropdown/Event/StudyCreatedEvent";
import StudyUpdatedEvent from "./Dropdown/Event/StudyUpdatedEvent";
import NotificationApi from "../lib/apis/NotificationApi";
import HandleResponseApi from "../lib/HandleResponse";
import store from "../lib/features/redux/store";
import {
  addStudyCreated,
  addStudyUpdated,
} from "../lib/features/redux/notificationSlice";
import { checkFirstLoggedIn } from "../lib/features/redux/authSlice";
import { selectAuth } from "../lib/features/redux/authSelector";
import {
  selectStudyCreated,
  selectStudyUpdated,
} from "../lib/features/redux/notificationSelector";
import { Notification, NotificationDto, NotificationType } from "../utils/type";

const Title = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const handleResponse = HandleResponseApi.useHandleResponse();
  const { user, isAuthenticated, firstLoggedIn } = useSelector(selectAuth);
  const studyCreated = useSelector(selectStudyCreated);
  const studyUpdated = useSelector(selectStudyUpdated);

  const addUnReadNotification = (dataList: NotificationDto[]) => {
    console.log("addUnreadNotification", dataList, studyUpdated, studyCreated);
    dataList.forEach((data) => {
      if (data.notificationType === NotificationType.STUDY_UPDATED) {
        const exists = studyUpdated.some((item) => item.id === data.id);
        console.log("exists => ", exists);
        if (!exists) {
          console.log("Adding new study updated notification => ", data);
          store.dispatch(addStudyUpdated(JSON.stringify(data))); // No need for JSON.stringify
        }
      } else if (data.notificationType === NotificationType.STUDY_CREATED) {
        const exists = studyCreated.some((item) => item.id === data.id);
        if (!exists) {
          console.log("Adding new study created notification => ", data);
          store.dispatch(addStudyCreated(JSON.stringify(data)));
        }
      }
    });
  };

  useEffect(() => {
    console.log("firstLoggedIn => ", firstLoggedIn);
    if (isAuthenticated && !firstLoggedIn) {
      store.dispatch(checkFirstLoggedIn());
      const getNotificationsUnRead = async () => {
        const resposne = await NotificationApi.getNotificationUnRead();
        console.log("getNotficationsUnRead => ", resposne);
        handleResponse(resposne, addUnReadNotification, {
          path: "",
          dialog: "",
        });
      };
      getNotificationsUnRead();
    }
  }, []);

  if (isAuthenticated) {
    if (user) {
      sseService.connect(user);
    } else {
      console.error("User is null, cannot connect to SSE service.");
    }
    return (
      <S.Home_Header_style>
        <S.App_Image_style>
          <Link to="/">
            <S.Header_Image_style src="/images/image.png"></S.Header_Image_style>
          </Link>
          {children}
        </S.App_Image_style>
        <S.Login_Signup_style>
          <DropDownContainer
            profile={<Bell></Bell>}
            header={<NotificationHeader setNotifications={setNotifications} />}
          >
            {notifications.length > 0 &&
              notifications.map(({ id, studyPath, type }, index) => (
                <li key={`${index}`}>
                  {type === "studyCreated" && (
                    <StudyCreatedEvent
                      id={id}
                      studyPath={studyPath}
                      notifications={notifications}
                      setNotifications={setNotifications}
                    />
                  )}
                  {type === "studyUpdated" && (
                    <StudyUpdatedEvent
                      id={id}
                      studyPath={studyPath}
                      notifications={notifications}
                      setNotifications={setNotifications}
                    />
                  )}
                </li>
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
      </S.Home_Header_style>
    );
  } else {
    return (
      <S.Home_Header_style>
        <S.App_Image_style>
          <Link to="/">
            <S.Header_Image_style src="/images/image.png"></S.Header_Image_style>
          </Link>
          {children}
        </S.App_Image_style>
        <S.Login_Signup_style>
          <Link style={S.link_style} to="/login">
            Login
          </Link>
          <Link style={S.link_style} to="/sign-up">
            Sign-Up
          </Link>
        </S.Login_Signup_style>
      </S.Home_Header_style>
    );
  }
};

export default Title;
