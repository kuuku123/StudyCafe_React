import React from "react";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import Page from "../../components/Page";
import * as S from "./EmailResendPage_style";
import HandleResponseApi from "../../lib/HandleResponse";

const EmailReSendPage = () => {
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleClick = async () => {
    const raw_response = await fetch(
      `${API_GATEWAY_URL}/auth/resend-confirm-email`,
      {
        credentials: "include",
        method: "GET",
      }
    );
    const response = await raw_response.json();
    console.log(response.message);
    handleResponse(response, null, { path: "", dialog: "" });
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
