import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./ProfileSetting_Main_style";
import RoutesEnum from "../../lib/RoutesEnum";
import ProfileEdit_Main from "./ProfileComponent/ProfileEditPage/ProfileEdit_Main";
import ProfileTagsAndZones_Main from "./ProfileComponent/ProfileTagsAndZonesPage/ProfileTagsAndZones_Main";
import ProfilePassword_Main from "./ProfileComponent/ProfilePasswordPage/ProfilePassword_Main";
import ProfileAlarm_Main from "./ProfileComponent/ProfileAlarmPage/ProfileAlarm_Main";
import ProfileAccount_Main from "./ProfileComponent/ProfileAccountPage/ProfileAccount_Main";

const ProfileSetting_Main = () => {
  const [category, setCategory] = useState("password");

  const pageComponet = {
    profileEdit: <ProfileEdit_Main></ProfileEdit_Main>,
    password: <ProfilePassword_Main></ProfilePassword_Main>,
    alarm: <ProfileAlarm_Main></ProfileAlarm_Main>,
    tagsAndZones: <ProfileTagsAndZones_Main></ProfileTagsAndZones_Main>,
    account: <ProfileAccount_Main></ProfileAccount_Main>,
  };

  const handleOnClick = (category) => {
    setCategory(category);
  };

  return (
    <S.Grid_Container_style>
      <S.Profile_List_style>
        <S.Profile_List_Element_style
          onClick={() => handleOnClick("profileEdit")}
        >
          Profile Edit
        </S.Profile_List_Element_style>
        <Link to={RoutesEnum.PROFILE}>
          <S.Profile_List_Element_style>Profile</S.Profile_List_Element_style>
        </Link>
        <S.Profile_List_Element_style onClick={() => handleOnClick("password")}>
          Password
        </S.Profile_List_Element_style>
        <S.Profile_List_Element_style onClick={() => handleOnClick("alarm")}>
          Alaram
        </S.Profile_List_Element_style>
        <S.Profile_List_Element_style
          onClick={() => handleOnClick("tagsAndZones")}
        >
          Tag and Zone
        </S.Profile_List_Element_style>
        <S.Profile_List_Element_style onClick={() => handleOnClick("account")}>
          Account
        </S.Profile_List_Element_style>
      </S.Profile_List_style>

      {pageComponet[category]}
    </S.Grid_Container_style>
  );
};

export default ProfileSetting_Main;
