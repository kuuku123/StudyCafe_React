import React from "react";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import { useNavigate } from "react-router-dom";
import * as MyLayout from "../../lib/MyLayout";
import Page from "../../components/Page";
import * as S from "./EmailResendPage_style.jsx";
import Button from "../../components/Button.jsx";
import Dialog from "../../components/Dialog.jsx";

const EmailReSendPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();

  const handleClick = async () => {
    const raw_response = await fetch(
      "http://localhost:8081/resend-confirm-email",
      {
        credentials: "include",
        method: "GET",
      }
    );
    const response = await raw_response.json();
    console.log(response.message);
    if (response.status === "OK") {
      navigate("/");
    } else {
      openDialog(
        <Dialog
          header={<>오류</>}
          footer={<Button onClick={closeDialog}>네, 알겠습니다</Button>}
        >
          {response.message}
        </Dialog>
      );
    }
  };
  return (
    <Page
      header={
        <Title>
          <S.Header_Input_style></S.Header_Input_style>
        </Title>
      }
      footer={<CopyRight></CopyRight>}
    >
      <button onClick={handleClick}>Resend Email Verification</button>
    </Page>
  );
};

export default EmailReSendPage;
