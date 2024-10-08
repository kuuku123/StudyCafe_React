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
import { loginSuccess } from "../../lib/features/auth/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();
  const dispatch = useDispatch()

  const handleSubmit = async (loginInfo) => {
    const raw_response = await fetch("http://localhost:8081/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    const response = await raw_response.json();
    console.log("response ==> ",response)
    if (response.status === "OK") {
      console.log("response data => ",response.data)
      dispatch(loginSuccess(response.data))
      sessionStorage.setItem("user", loginInfo.nicknameOrEmail);
      sessionStorage.setItem("login", "success");
      navigate("/");
    } else {
      localStorage.removeItem("login");
      openDialog(
        <Dialog
          header={<>Error</>}
          footer={<Button onClick={() => closeDialog(RoutesEnum.SIGN_UP)}>Close</Button>}
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
        </S.Login_Main_style>
      </Page>
    </div>
  );
};

export default LoginPage;
