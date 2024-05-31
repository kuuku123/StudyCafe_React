import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import * as S from "./SignupPage_style";
import * as MyLayout from "../../lib/MyLayout";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";

const SignupPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();
  const handleSubmit = async (signupInfo) => {
    const response = await fetch("http://localhost:8081/sign-up", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    }).then((res) => {
      console.log(res);
      return res.json();
    });
    console.log("response status", response.status);
    if (response.status === "OK") {
      console.log(response.headers);
      navigate("/");
    } else {
      console.log(response.body);
      if (response.body != null) {
        openDialog(response.body);
      } else {
        console.log("went rhere");
        openDialog(
          <Dialog
            header={<>오류</>}
            footer={<Button onClick={closeDialog}>네, 알겠습니다</Button>}
          >
            "duplicate nickname or email"
          </Dialog>
        );
      }
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
        <S.Signup_Main_style>
          <S.Signup_Container_style>
            <h1>계정 만들기</h1>
          </S.Signup_Container_style>
          <SignupForm onSubmit={handleSubmit}></SignupForm>
          <S.Signup_Container_style>
            <S.SignUp_Button_style type="submit" form="signup-form">
              가입 하기
            </S.SignUp_Button_style>
          </S.Signup_Container_style>
        </S.Signup_Main_style>
      </Page>
    </div>
  );
};

export default SignupPage;
