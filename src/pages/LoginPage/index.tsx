import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import LoginForm from "./LoginForm";
import CopyRight from "../../components/CopyRight";
import * as S from "./LoginForm_style";
import * as MyLayout from "../../lib/MyLayout";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import RoutesEnum from "../../lib/RoutesEnum";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../lib/features/redux/authSlice";
import ProfileApi from "../../lib/apis/ProfileApi";
import HandleResponseApi from "../../lib/HandleResponse";
import { LoginFormType } from "../../utils/type";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { openDialog, closeDialog } = MyLayout.useDialog();
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleSubmit = async (loginInfo: LoginFormType) => {
    const jwtResponse = await fetch(`${API_GATEWAY_URL}/auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
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
    } else {
      openDialog(
        <Dialog
          header={<>Error</>}
          footer={
            <Button onClick={() => closeDialog(RoutesEnum.SIGN_UP)}>
              Close
            </Button>
          }
        >
          {jwtResponse.data}
        </Dialog>
      );
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
      <S.Login_Main_style>
        <S.LoginCard>
          <S.TitleContainer>
            <S.LoginTitle>Welcome Back</S.LoginTitle>
            <S.Subtitle>Please enter your details to sign in</S.Subtitle>
          </S.TitleContainer>

          <LoginForm onSubmit={handleSubmit} />

          <S.Login_Button_style type="submit" form="login-form">
            Sign In
          </S.Login_Button_style>

          <S.Divider>
            <span>or continue with</span>
          </S.Divider>

          <S.Social_Login_Container>
            <a href={`${API_GATEWAY_URL}/auth/oauth2/authorization/google`}>
              <S.Social_Icon_Wrapper title="Google">
                <img src={"images/social/google.png"} alt="Google" />
              </S.Social_Icon_Wrapper>
            </a>
            <S.Social_Icon_Wrapper title="Kakao">
              <img src={"images/social/kakao.png"} alt="Kakao" />
            </S.Social_Icon_Wrapper>
            <S.Social_Icon_Wrapper title="Naver">
              <img src={"images/social/naver.png"} alt="Naver" />
            </S.Social_Icon_Wrapper>
          </S.Social_Login_Container>

          <S.FooterLink>
            Don't have an account? <Link to={RoutesEnum.SIGN_UP}>Sign up for free</Link>
          </S.FooterLink>
        </S.LoginCard>
      </S.Login_Main_style>
    </Page>
  );
};

export default LoginPage;
