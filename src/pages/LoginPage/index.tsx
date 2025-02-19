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
    console.log("jwtReposnse =>  ", jwtResponse);

    if (jwtResponse.status === "OK") {
      const response = await ProfileApi.fetchProfile();
      handleResponse(response, (data) => dispatch(loginSuccess(data)), {
        useNav: true,
        path: RoutesEnum.HOME,
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
          {jwtResponse.message}
        </Dialog>
      );
    }
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
        <S.Login_Main_style>
          <S.Login_Container_style>
            <h1>Login</h1>
          </S.Login_Container_style>
          <LoginForm onSubmit={handleSubmit}></LoginForm>
          <S.Login_Container_style>
            <S.Login_Button_style type="submit" form="login-form">
              Login
            </S.Login_Button_style>
          </S.Login_Container_style>
          <S.Social_Login_Button_Container_style>
            <a href={`${API_GATEWAY_URL}/auth/oauth2/authorization/google`}>
              <S.Social_Login_Button_style
                src={"images/social/google.png"}
              ></S.Social_Login_Button_style>
            </a>
            <S.Social_Login_Button_style
              src={"images/social/kakao.png"}
            ></S.Social_Login_Button_style>
            <S.Social_Login_Button_style
              src={"images/social/naver.png"}
            ></S.Social_Login_Button_style>
          </S.Social_Login_Button_Container_style>
        </S.Login_Main_style>
      </Page>
    </div>
  );
};

export default LoginPage;
