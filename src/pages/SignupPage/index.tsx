import React, { useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import SignupForm from "./SignupForm";
import * as S from "./SignupForm_style";
import HandleResponseApi from "../../lib/HandleResponse";
import RoutesEnum from "../../lib/RoutesEnum";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../lib/features/redux/authSlice";
import ProfileApi from "../../lib/apis/ProfileApi";
import { SignUpForm } from "../../utils/type";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();
  const handleSubmit = async (signupInfo: SignUpForm) => {
    const jwtResponse = await fetch(`${API_GATEWAY_URL}/auth/sign-up`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    }).then((res) => {
      return res.json();
    });

    handleResponse(jwtResponse, null, { path: "", dialog: "" });

    if (jwtResponse.status === "OK") {
      const response = await ProfileApi.fetchMyProfile();

      handleResponse(response, (data) => dispatch(loginSuccess(data)), {
        path: RoutesEnum.HOME,
        dialog: "",
      });
    }
  };

  return (
    <Page
      header={
        <Title>
          <S.Header_Input_style />
        </Title>
      }
      footer={<CopyRight />}
    >
      <S.Signup_Main_style>
        <S.SignupCard>
          <S.TitleContainer>
            <S.SignupTitle>Create Account</S.SignupTitle>
            <S.Subtitle>Join our community and start studying together</S.Subtitle>
          </S.TitleContainer>

          <SignupForm
            onSubmit={handleSubmit}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
          />

          {emailVerified && (
            <S.SignUp_Button_style type="submit" form="signup-form">
              Complete Enrollment
            </S.SignUp_Button_style>
          )}

          <S.Signup_Container_style style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
            Already have an account? <Link to={RoutesEnum.LOGIN} style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </S.Signup_Container_style>
        </S.SignupCard>
      </S.Signup_Main_style>
    </Page>
  );
};

export default SignupPage;
