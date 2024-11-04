import React, { useEffect, useState } from "react";
import { CgCalendar, CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";
import * as S from "./Profile_Main_style";
import ProfileApi from "../../lib/apis/ProfileApi";
import HandleResponseApi from "../../lib/HandleResponse";
import RoutesEnum from "../../lib/RoutesEnum";

const Profile_Main = () => {
  const [img, setImage] = useState();
  const [profile, setProfile] = useState({
    nickname: "default nickName",
    bio: "default bio",
    email: "default email",
  });

  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleImage = (profile_image_base64_encoded) => {
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    const getProfileImage = async () => {
      const profile_image_json = await ProfileApi.fetchProfileImage();
      handleResponse(profile_image_json, handleImage, false);
    };
    getProfileImage();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileApi.fetchProfile();
      console.log("profile=> ", response);
      handleResponse(response, setProfile, false);
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
        <Link to={"/profile"}>
          <S.Profile_List_Element_style>Profile</S.Profile_List_Element_style>
        </Link>
        <S.Profile_List_Element_style>Study</S.Profile_List_Element_style>
      </S.Profile_List_style>
      <S.Profile_Name_style>{profile.nickname}</S.Profile_Name_style>
      <S.Profile_Info_style>
        {profile.bio || "default bio"}
      </S.Profile_Info_style>
      <S.Profile_Email_style>
        <CgMail size={"55px"}></CgMail>
        {profile.email}
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
