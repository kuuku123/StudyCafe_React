import React, { useEffect, useState } from "react";
import * as MyForm from "../../../../lib/MyForm";
import FormControl from "../../../../components/FormControl";
import * as S from "./ProfileEdit_Main_style";
import HandleResponseApi from "../../../../lib/HandleResponse";
import ProfileApi from "../../../../lib/apis/ProfileApi";
import RoutesEnum from "../../../../lib/RoutesEnum";
import { Profile } from "../../../../utils/type";
import { useDispatch } from "react-redux";
import { clearCache } from "../../../../lib/features/redux/chatProfileCacheSlice";

const ProfileEdit_Main = () => {
  const [img, setImage] = useState<string>("");
  const handleResponse = HandleResponseApi.useHandleResponse();
  const dispatch = useDispatch();

  const handleProfile = (profile: Profile) => {
    const base64Image = "data:image/png;base64," + profile.profileImage;
    setImage(base64Image);
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileApi.fetchMyProfile();
      console.log("profile=> ", response);
      handleResponse(response, handleProfile, { path: "", dialog: "" });
    };
    getProfile();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const handleSubmit = async (profileEditInfo: Profile) => {
    profileEditInfo["profileImage"] = img;
    const response = await ProfileApi.updatePorfile(profileEditInfo);
    handleResponse(response, (data) => dispatch(clearCache(data)) , { path: RoutesEnum.PROFILE, dialog: "" });
  };

  const validate = () => {
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
    <>
      <MyForm.Form
        style={S.Profile_Edit_style}
        id="profile-edit-form"
        initialValue={{
          bio: "",
          url: "",
          occupation: "",
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
          htmlFor="url"
          error={<MyForm.ErrorMessage name="url"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="profile-edit-url"
            name="url"
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
          htmlFor="occupation"
          error={<MyForm.ErrorMessage name="occupation"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="profile-edit-occupation"
            name="occupation"
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
    </>
  );
};

export default ProfileEdit_Main;
