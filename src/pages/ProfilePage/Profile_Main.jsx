import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profile_Main = () => {
  const Grid_Container_style = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
    min-height: 60vh;
    justify-items: center;
    align-items: center;
  `;

  const Profile_Pic_style = styled.div`
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
  `;
  const Profile_MyProfile_style = styled.div`
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column-start: 1;
    grid-column-end: 2;
  `;
  const Profile_Study_style = styled.div`
    grid-row-start: 6;
    grid-row-end: 7;
    grid-column-start: 1;
    grid-column-end: 2;
  `;
  const Profile_Name_style = styled.div`
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 4;
  `;
  const Profile_Info_style = styled.div`
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 4;
  `;
  const Profile_Email_style = styled.div`
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column-start: 2;
    grid-column-end: 4;
  `;
  const Profile_Emailverfication_style = styled.div`
    grid-row-start: 6;
    grid-row-end: 7;
    grid-column-start: 2;
    grid-column-end: 4;
  `;
  const Profile_Edit_style = styled.div`
    grid-row-start: 7;
    grid-row-end: 8;
    grid-column-start: 2;
    grid-column-end: 4;
  `;

  const [img, setImage] = useState();

  useEffect(() => {
    async function fetchProfileImage() {
      const raw_profile_image = await fetch(
        `http://localhost:8081/profile-image?user=${sessionStorage.getItem(
          "user"
        )}`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const profile_image = await raw_profile_image.blob();
      const url = URL.createObjectURL(profile_image);
      setImage(url);
    }
    fetchProfileImage();
  }, []);

  return (
    <Grid_Container_style>
      <Profile_Pic_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
      </Profile_Pic_style>
      <Profile_MyProfile_style>myprofile</Profile_MyProfile_style>
      <Profile_Study_style>study</Profile_Study_style>
      <Profile_Name_style>{sessionStorage.getItem("user")}</Profile_Name_style>
      <Profile_Info_style>info</Profile_Info_style>
      <Profile_Email_style>email</Profile_Email_style>
      <Profile_Emailverfication_style>
        <Link to={"/profile-setting"}>email verification</Link>
      </Profile_Emailverfication_style>
    </Grid_Container_style>
  );
};

export default Profile_Main;
