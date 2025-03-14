import React, { useEffect, useState } from "react";
import { CgCalendar, CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";
import * as S from "./Profile_Main_style";
import ProfileApi from "../../lib/apis/ProfileApi";
import HandleResponseApi from "../../lib/HandleResponse";
import RoutesEnum from "../../lib/RoutesEnum";
import { AccountDto, Profile } from "../../utils/type";

const Profile_Main = () => {
  const [img, setImage] = useState<string>();
  const [profile, setProfile] = useState<AccountDto>();

  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleProfile = (profile: AccountDto) => {
    setProfile(profile);
    const base64Image = "data:image/png;base64," + profile.profileImage;
    setImage(base64Image);
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileApi.fetchMyProfile();
      console.log("profile=> ", response);
      handleResponse(response, handleProfile, { path: "", dialog: "" });
    };
    getProfile();
  }, []);

  return (
    <S.Grid_Container_style>
      <S.Profile_Pic_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
      </S.Profile_Pic_style>
      <S.Profile_List_style>
        <Link to={RoutesEnum.PROFILE}>
          <S.Profile_List_Element_style>Profile</S.Profile_List_Element_style>
        </Link>
        <Link to={RoutesEnum.MY_STUDY_LIST}>
          <S.Profile_List_Element_style>Study</S.Profile_List_Element_style>
        </Link>
      </S.Profile_List_style>
      <S.Profile_Name_style>{profile?.nickname}</S.Profile_Name_style>
      <S.Profile_Info_style>
        {profile?.bio || "default bio"}
      </S.Profile_Info_style>
      <S.Profile_Link_style href={profile?.url}>
        {profile?.url || "default url"}
      </S.Profile_Link_style>
      <S.Profile_Email_style>
        <CgMail size={"55px"}></CgMail>
        {profile?.email}
      </S.Profile_Email_style>
      <S.Profile_Emailverification_style>
        <CgCalendar size={"55px"}></CgCalendar>
        <div>email verification</div>
      </S.Profile_Emailverification_style>
      <S.Profile_Edit_style>
        <Link to={RoutesEnum.PROFILE_SETTING}>profile edit</Link>
      </S.Profile_Edit_style>
    </S.Grid_Container_style>
  );
};

export default Profile_Main;
