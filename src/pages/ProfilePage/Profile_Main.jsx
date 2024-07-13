import React, { useEffect, useState } from "react";
import { CgCalendar, CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";
import * as S from "./Profile_style";
import ProfileApi from "../../components/ProfileApi";

const Profile_Main = () => {
  const [img, setImage] = useState();
  const [profile, setProfile] = useState({
    bio: "default bio",
    email: "default email",
  });

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const profile_image = await ProfileApi.fetchProfileImage();
        const url = URL.createObjectURL(profile_image);
        setImage(url);
      } catch (error) {
        console.log("failed to fetch image ", error);
      }
    };
    getProfileImage();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await ProfileApi.fetchProfile();
        setProfile(profile);
      } catch (error) {
        console.log(error)
      }
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
        <S.Profile_List_Element_style>Profile</S.Profile_List_Element_style>
        <S.Profile_List_Element_style>Study</S.Profile_List_Element_style>
      </S.Profile_List_style>
      <S.Profile_Name_style>
        {sessionStorage.getItem("user")}
      </S.Profile_Name_style>
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
        <Link to={"/profile-setting"}>profile edit</Link>
      </S.Profile_Edit_style>
    </S.Grid_Container_style>
  );
};

export default Profile_Main;
