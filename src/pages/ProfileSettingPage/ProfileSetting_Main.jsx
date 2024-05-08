import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProfileSetting_Main = () => {
  const Grid_Container_style = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
    min-height: 60vh;
    justify-items: center;
    align-items: center;
  `;
  const Profile_List_style = styled.div`
    display: flex;
    grid-row-start: 2;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
  `;
  const Profile_Edit_style = styled.div`
    grid-row-start: 2;
    grid-row-end: 7;
    grid-column-start: 2;
    grid-column-end: 4;
  `;
  const Profile_Image_style = styled.figure`
    grid-row-start: 2;
    grid-row-end: 6;
    grid-column-start: 4;
    grid-column-end: 5;
  `;

  const [img, setImage] = useState()

  useEffect(() => {
    async function fetchProfileImage() {
      const raw_profile_image = await fetch(
        `http://localhost:8081/profile-image?user=${sessionStorage.getItem("user")}`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const profile_image = await raw_profile_image.blob();
      const url = URL.createObjectURL(profile_image);
      setImage(url)
    }
    fetchProfileImage();
  }, []);

  return (
    <Grid_Container_style>
      <Profile_List_style>
        <h2>Profile List</h2>
        <h3>Profile</h3>
        <h3>Password</h3>
        <h3>Alaram</h3>
        <h3>Interested Theme</h3>
        <h3>Active Area</h3>
        <h3>Account</h3>
      </Profile_List_style>
      <Profile_Edit_style>Profile Edit</Profile_Edit_style>
      <Profile_Image_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{textAlign: "center"}}>Profile Image</figcaption>
      </Profile_Image_style>
    </Grid_Container_style>
  );
};

export default ProfileSetting_Main;
