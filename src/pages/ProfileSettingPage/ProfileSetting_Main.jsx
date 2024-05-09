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
  const Profile_Edit_style = styled.form`
    grid-row-start: 2;
    grid-row-end: 7;
    grid-column-start: 2;
    grid-column-end: 4;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  const Profile_Image_style = styled.figure`
    grid-row-start: 2;
    grid-row-end: 6;
    grid-column-start: 4;
    grid-column-end: 5;
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

  const handleSubmit = () => {
    
  }

  return (
    <Grid_Container_style>
      <Profile_List_style>
        <Profile_List_Element_style>Profile</Profile_List_Element_style>
        <Profile_List_Element_style>Password</Profile_List_Element_style>
        <Profile_List_Element_style>Alaram</Profile_List_Element_style>
        <Profile_List_Element_style>
          Interested Theme
        </Profile_List_Element_style>
        <Profile_List_Element_style>Active Area</Profile_List_Element_style>
        <Profile_List_Element_style>Account</Profile_List_Element_style>
      </Profile_List_style>
      <Profile_Edit_style>
        <div>{sessionStorage.getItem("user")}</div>
        <div>한 줄 소개</div>
        <input placeholder="간략한 소개를 부탁한다"></input>
        <div>길지 않게 35자이내로 입력하세요</div>
        <div>링크</div>
        <input placeholder="http://studycafe.com"></input>
        <div>
          블로그 유튜브 또는 포트폴리오나 좋아하는 웹 사이트 등 본인을 표현할 수
          있는 링크를 추가하세요
        </div>
        <div>직업</div>
        <input placeholder="어떤 일을 하고 계신가요?"></input>
        <div>개발자? 매니저? 취준생? 대표님?</div>
        <div>활동 지역</div>
        <input placeholder="Seattle, WA, USA"></input>
        <div>
          주요 활동(사는 곳이나 직장을 다니는 곳 또는 놀러 다니는 곳) 지역의
          도시이름을 알려주세요
        </div>
        <button onSubmit={handleSubmit}>수정하기</button>
      </Profile_Edit_style>
      <Profile_Image_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
      </Profile_Image_style>
    </Grid_Container_style>
  );
};

export default ProfileSetting_Main;
