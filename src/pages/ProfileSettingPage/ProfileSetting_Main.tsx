import React, { JSX, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./ProfileSetting_Main_style";
import RoutesEnum from "../../lib/RoutesEnum";
import ProfileEdit_Main from "./ProfileComponent/ProfileEditPage/ProfileEdit_Main";
import ProfileTagsAndZones_Main from "./ProfileComponent/ProfileTagsAndZonesPage/ProfileTagsAndZones_Main";
import ProfilePassword_Main from "./ProfileComponent/ProfilePasswordPage/ProfilePassword_Main";
import ProfileAlarm_Main from "./ProfileComponent/ProfileAlarmPage/ProfileAlarm_Main";
import ProfileAccount_Main from "./ProfileComponent/ProfileAccountPage/ProfileAccount_Main";

import { HiUser, HiPencil, HiKey, HiBell, HiTag, HiCog } from "react-icons/hi";

const ProfileSetting_Main = () => {
  const [category, setCategory] = useState(() => {
    return (
      sessionStorage.getItem("ProfileSetting_Main_category") || "profileEdit"
    );
  });

  useEffect(() => {
    sessionStorage.setItem("ProfileSetting_Main_category", category);
  }, [category]);

  const pageComponet: Record<string, JSX.Element> = {
    profileEdit: <ProfileEdit_Main></ProfileEdit_Main>,
    password: <ProfilePassword_Main></ProfilePassword_Main>,
    alarm: <ProfileAlarm_Main></ProfileAlarm_Main>,
    tagsAndZones: <ProfileTagsAndZones_Main></ProfileTagsAndZones_Main>,
    account: <ProfileAccount_Main></ProfileAccount_Main>,
  };

  const handleOnClick = (category: string) => {
    setCategory(category);
  };

  return (
    <S.Container>
      <S.Sidebar>
        <Link to={RoutesEnum.PROFILE} style={{ textDecoration: 'none' }}>
          <S.NavItem>
            <HiUser size={24} />
            Profile
          </S.NavItem>
        </Link>
        <S.NavItem
          active={category === "profileEdit"}
          onClick={() => handleOnClick("profileEdit")}
        >
          <HiPencil size={24} />
          Profile Edit
        </S.NavItem>
        <S.NavItem
          active={category === "password"}
          onClick={() => handleOnClick("password")}
        >
          <HiKey size={24} />
          Password
        </S.NavItem>
        <S.NavItem
          active={category === "alarm"}
          onClick={() => handleOnClick("alarm")}
        >
          <HiBell size={24} />
          Alarm
        </S.NavItem>
        <S.NavItem
          active={category === "tagsAndZones"}
          onClick={() => handleOnClick("tagsAndZones")}
        >
          <HiTag size={24} />
          Tag and Zone
        </S.NavItem>
        <S.NavItem
          active={category === "account"}
          onClick={() => handleOnClick("account")}
        >
          <HiCog size={24} />
          Account
        </S.NavItem>
      </S.Sidebar>

      <S.ContentCard>
        {pageComponet[category]}
      </S.ContentCard>
    </S.Container>
  );
};

export default ProfileSetting_Main;
