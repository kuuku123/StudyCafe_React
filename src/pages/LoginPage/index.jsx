import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import LoginForm from "./LoginForm";
import CopyRight from "../../components/CopyRight";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginForm_style";
import * as MyLayout from "../../lib/MyLayout";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import RoutesEnum from "../../lib/RoutesEnum";
import { useDispatch } from "react-redux";
import { addJWT, loginSuccess } from "../../lib/features/redux/authSlice";
import ProfileApi from "../../lib/apis/ProfileApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();
  const dispatch = useDispatch();

  const handleSubmit = async (loginInfo) => {
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
    
    dispatch(addJWT(jwtResponse.data));

    const response = await ProfileApi.fetchProfile(jwtResponse.data);

    if (response.status === "OK") {
      navigate("/");
      dispatch(loginSuccess(response.data));
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
          {response.message}
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
            <a
              href={`${SERVER_API_URL}/oauth2/authorization/google?redirect_url=${SERVER_API_URL}/login/oauth2/code/google`}
            >
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
