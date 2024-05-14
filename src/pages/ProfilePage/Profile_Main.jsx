import React, { useEffect, useState } from "react";
import { CgCalendar, CgMail } from "react-icons/cg";
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
  const Profile_List_style = styled.div`
    display: flex;
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column-start: 1;
    grid-column-end: 2;
    flex-direction: column;
    gap: 2px;
    margin-right: 13px;
  `;

  const Profile_List_Element_style = styled.button`
    background-color: green;
    color: white;
    padding: 0.375rem 0.75rem;
    width: 300px;
    font-size: 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    /* Hover effect */
    &:hover {
      background-color: #0056b3;
    }

    /* Active effect */
    &:active {
      background-color: #004080;
    }

    /* Disabled styles */
    &:disabled {
      background-color: #b3b3b3;
      color: #666666;
      cursor: not-allowed;
    }
  `;
  const Profile_Pic_style = styled.div`
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
  `;
  const Profile_Name_style = styled.div`
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 4;
    font-size: 30px;
  `;
  const Profile_Info_style = styled.div`
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 4;
    font-size: 20px;
  `;
  const Profile_Email_style = styled.div`
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column-start: 2;
    grid-column-end: 4;
    display: flex;
    justify-content: center;
    font-size: 30px;
  `;
  const Profile_Emailverification_style = styled.div`
    grid-row-start: 6;
    grid-row-end: 7;
    grid-column-start: 2;
    grid-column-end: 4;
    display: flex;
    justify-content: center;
    font-size: 30px;
  `;
  const Profile_Edit_style = styled.div`
    grid-row-start: 7;
    grid-row-end: 8;
    grid-column-start: 2;
    grid-column-end: 4;
    display: flex;
    justify-content: center;
    font-size: 30px;
  `;

  const [img, setImage] = useState();
  const [profile, setProfile] = useState({
    bio: "default bio",
    email: "default email",
  });

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

  useEffect(() => {
    async function fetchProfile() {
      const raw_profile = await fetch(`http://localhost:8081/profile`, {
        credentials: "include",
        method: "GET",
      });
      const profile = await raw_profile.json();
      console.log("profile.data.email => ", profile.data.email);
      setProfile(profile.data);
    }
    fetchProfile();
  }, []);

  return (
    <Grid_Container_style>
      <Profile_Pic_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
      </Profile_Pic_style>
      <Profile_List_style>
        <Profile_List_Element_style>Profile</Profile_List_Element_style>
        <Profile_List_Element_style>Study</Profile_List_Element_style>
      </Profile_List_style>
      <Profile_Name_style>{sessionStorage.getItem("user")}</Profile_Name_style>
      <Profile_Info_style>{profile.bio || "default bio"}</Profile_Info_style>
      <Profile_Email_style>
        <CgMail size={"55px"}></CgMail>
        {profile.email}
      </Profile_Email_style>
      <Profile_Emailverification_style>
        <CgCalendar size={"55px"}></CgCalendar>
        <div>email verification</div>
      </Profile_Emailverification_style>
      <Profile_Edit_style>
        <Link to={"/profile-setting"}>profile edit</Link>
      </Profile_Edit_style>
    </Grid_Container_style>
  );
};

export default Profile_Main;
