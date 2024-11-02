import React from "react";
import SocialAccountSetPassword_Main from "./SocialAccountSetPassword_Main";
import Page from "../../../../components/Page";
import Title from "../../../../components/Title";
import * as S from "./SocialAccountSetPassword_Main_style";
import CopyRight from "../../../../components/CopyRight";

const SocialAccountSetPasswordPage = () => {
  return (
    <>
      <Page
        header={
          <Title>
            <S.Header_Input_style></S.Header_Input_style>
          </Title>
        }
        footer={<CopyRight></CopyRight>}
      >
        <SocialAccountSetPassword_Main></SocialAccountSetPassword_Main>
      </Page>
    </>
  );
};

export default SocialAccountSetPasswordPage;
