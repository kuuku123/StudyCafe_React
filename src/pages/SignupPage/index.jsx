import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import SignupForm from "./SignupForm";
import * as S from "./SignupForm_style";
import HandleResponseApi from "../../lib/HandleResponse";
import RoutesEnum from "../../lib/RoutesEnum";
import { useDispatch } from "react-redux";
import { addJWT, loginSuccess } from "../../lib/features/redux/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();
  const handleSubmit = async (signupInfo) => {
    const jwtResponse = await fetch(`${API_GATEWAY_URL}/auth/sign-up`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    }).then((res) => {
      console.log("signup => ", res);
      return res.json();
    });

    dispatch(addJWT(jwtResponse.data));

    const response = await fetch(`${API_GATEWAY_URL}/app/sign-up`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jwtResponse.data,
    }).then((res) => {
      console.log("signup => ", res);
      return res.json();
    });

    handleResponse(response, (data) => dispatch(loginSuccess(data)), {
      useNav: true,
      path: RoutesEnum.HOME,
    });
  };

  return (
    <div>
      <Page
        header={
          <Title>
            <S.Header_Input_style></S.Header_Input_style>
          </Title>
        }
        footer={<CopyRight></CopyRight>}
      >
        <S.Signup_Main_style>
          <S.Signup_Container_style>
            <h1>Create Account</h1>
          </S.Signup_Container_style>
          <SignupForm onSubmit={handleSubmit}></SignupForm>
          <S.Signup_Container_style>
            <S.SignUp_Button_style type="submit" form="signup-form">
              Enroll
            </S.SignUp_Button_style>
          </S.Signup_Container_style>
        </S.Signup_Main_style>
      </Page>
    </div>
  );
};

export default SignupPage;
