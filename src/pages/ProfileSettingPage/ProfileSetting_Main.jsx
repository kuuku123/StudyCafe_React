import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FomrControl";
import * as S from "./ProfileSeting_style";
import HandleResponseApi from "../../lib/HandleResponse";
import ProfileApi from "../../lib/ProfileApi";

const ProfileSetting_Main = () => {
  const [img, setImage] = useState();
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
      console.log("profile_image_json => ", profile_image_json);
      hanldeResponse(profile_image_json, handleImage, false);
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
    HandleResponseApi.handleResponse(response);
  };

  const validate = (values) => {
    const errors = {};
    return errors;
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
