import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import * as MyForm from "../../lib/MyForm";
import styled from "styled-components";
import FormControl from "../../component/FomrControl";

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

  const Profile_Edit_style = {
    gridRowStart: "2",
    gridRowEnd: "7",
    gridColumnStart: "2",
    gridColumnEnd: "4",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  const Profile_Image_style = styled.figure`
    grid-row-start: 2;
    grid-row-end: 6;
    grid-column-start: 4;
    grid-column-end: 5;
  `;

  const [img, setImage] = useState();
  const navigate = useNavigate();

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

  const handleSubmit = async (profileEditInfo) => {
    const raw_response = await fetch("http://localhost:8081/settings/profile", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(profileEditInfo),
    });
    const response = await raw_response.json();
    console.log(response);
    if (response.status === "OK") {
      console.log("update ok~");
      navigate("/");
    } else {
      alert("BadRequest");
    }
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

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

      <MyForm.Form
        style={Profile_Edit_style}
        id="profile-edit-form"
        initialValue={{ bio: "", link: "", job: "", location: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <div>{sessionStorage.getItem("user")}</div>
        <FormControl
          label="한줄소개를 작성해주세요"
          htmlFor="bio"
          error={<MyForm.ErrorMessage name="bio"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="profile-edit-bio"
            name="bio"
            placeholder="간략한 소개를 부탁한다"
          ></MyForm.Field>
          <div>길지 않게 35자이내로 입력하세요</div>
        </FormControl>

        <FormControl
          label="나의 링크"
          htmlFor="link"
          error={<MyForm.ErrorMessage name="link"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="profile-edit-link"
            name="link"
            placeholder="http://studycafe.com"
          ></MyForm.Field>
          <div>
            블로그 유튜브 또는 포트폴리오나 좋아하는 웹 사이트 등 본인을 표현할
            수 있는 링크를 추가하세요
          </div>
        </FormControl>
        <FormControl
          label="직업"
          htmlFor="job"
          error={<MyForm.ErrorMessage name="job"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="profile-edit-job"
            name="job"
            placeholder="어떤 일을 하고 계신가요?"
          ></MyForm.Field>
          <div>개발자? 매니저? 취준생? 대표님?</div>
        </FormControl>
        <FormControl
          label="내가 사는 주소"
          htmlFor="location"
          error={<MyForm.ErrorMessage name="location"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="profile-edit-location"
            name="location"
            placeholder="어디에 살고 게신가요?"
          ></MyForm.Field>
          <div>
            주요 활동(사는 곳이나 직장을 다니는 곳 또는 놀러 다니는 곳) 지역의
            도시이름을 알려주세요
          </div>
        </FormControl>
        <button type="submit">수정하기</button>
      </MyForm.Form>

      {/* <Profile_Edit_style onSubmit={handleSubmit}>
        <div>{sessionStorage.getItem("user")}</div>
        <div>한 줄 소개</div>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="간략한 소개를 부탁한다"
        ></input>
        <div>길지 않게 35자이내로 입력하세요</div>
        <div>링크</div>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="http://studycafe.com"
        ></input>
        <div>
          블로그 유튜브 또는 포트폴리오나 좋아하는 웹 사이트 등 본인을 표현할 수
          있는 링크를 추가하세요
        </div>
        <div>직업</div>
        <input
          type="text"
          name="job"
          value={formData.job}
          onChange={handleChange}
          placeholder="어떤 일을 하고 계신가요?"
        ></input>
        <div>개발자? 매니저? 취준생? 대표님?</div>
        <div>활동 지역</div>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Seattle, WA, USA"
        ></input>
        <div>
          주요 활동(사는 곳이나 직장을 다니는 곳 또는 놀러 다니는 곳) 지역의
          도시이름을 알려주세요
        </div>
        <button type="submit">수정하기</button>
      </Profile_Edit_style> */}
      <Profile_Image_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
      </Profile_Image_style>
    </Grid_Container_style>
  );
};

export default ProfileSetting_Main;
