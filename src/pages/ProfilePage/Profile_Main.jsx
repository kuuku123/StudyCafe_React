import React, { useEffect, useState } from "react";
import { CgCalendar, CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";
import * as S from "./Profile_style";
import ProfileApi from "../../lib/ProfileApi";
import HandleResponseApi from "../../lib/HandleResponse";

const Profile_Main = () => {
  const [img, setImage] = useState();
  const [profile, setProfile] = useState({
    bio: "default bio",
    email: "default email",
  });

  const hanldeResponse = HandleResponseApi.useHandleResponse();

  const handleImage = (profile_image_base64_encoded) => {
    console.log("at handle Image => ", profile_image_base64_encoded);
    const base64WithoutHeader = profile_image_base64_encoded.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    // Convert Base64 to binary string
    const binaryString = atob(base64WithoutHeader);

    // Convert binary string to array of 8-bit unsigned integers
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "image/jpeg" });
    // const profile_image = profile_image_base64_encoded.blob();
    const url = URL.createObjectURL(blob);
    setImage(url);
  };

  useEffect(() => {
    const getProfileImage = async () => {
      const profile_image_json = await ProfileApi.fetchProfileImage();
      hanldeResponse(profile_image_json, handleImage, false);
    };
    getProfileImage();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileApi.fetchProfile();
      hanldeResponse(response, setProfile, false);
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
