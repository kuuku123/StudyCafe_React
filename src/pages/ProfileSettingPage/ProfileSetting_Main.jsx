import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FomrControl";
import * as S from "./ProfileSeting_Main_style";
import HandleResponseApi from "../../lib/HandleResponse";
import ProfileApi from "../../lib/apis/ProfileApi";
import RoutesEnum from "../../lib/RoutesEnum";

const ProfileSetting_Main = () => {
  const [img, setImage] = useState();
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

  const onChange = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (profileEditInfo) => {
    profileEditInfo["profileImage"] = img;
    const raw_response = await fetch(`${SERVER_API_URL}/settings/profile`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(profileEditInfo),
    });
    const response = await raw_response.json();
    handleResponse(response, null, { useNav: true, path: RoutesEnum.PROFILE });
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

  const input_style = {
    width: "100%", // Takes full width of the parent container
    maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
    height: "30px",
    minWidth: "200px", // Ensures it doesn't shrink too much
  };

  return (
    <S.Grid_Container_style>
      <S.Profile_List_style>
        <Link to={"/profile"}>
          <S.Profile_List_Element_style>Profile</S.Profile_List_Element_style>
        </Link>
        <S.Profile_List_Element_style>Password</S.Profile_List_Element_style>
        <S.Profile_List_Element_style>Alaram</S.Profile_List_Element_style>
        <S.Profile_List_Element_style>
          Interested Theme
        </S.Profile_List_Element_style>
        <S.Profile_List_Element_style>Active Area</S.Profile_List_Element_style>
        <S.Profile_List_Element_style>Account</S.Profile_List_Element_style>
      </S.Profile_List_style>

      <MyForm.Form
        style={S.Profile_Edit_style}
        id="profile-edit-form"
        initialValue={{
          bio: "",
          link: "",
          job: "",
          location: "",
          profileImage: img,
        }}
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
            style={input_style}
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
            style={input_style}
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
            style={input_style}
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
            style={input_style}
          ></MyForm.Field>
          <div>
            주요 활동(사는 곳이나 직장을 다니는 곳 또는 놀러 다니는 곳) 지역의
            도시이름을 알려주세요
          </div>
        </FormControl>
        <button type="submit">수정하기</button>
      </MyForm.Form>
      <S.Profile_Image_style>
        <img src={img} width="120px" height="120px"></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="profile_img"
          onChange={onChange}
        ></input>
      </S.Profile_Image_style>
    </S.Grid_Container_style>
  );
};

export default ProfileSetting_Main;
