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
        <S.Set_Password_Main_style>
          <S.Set_Password_Container_style>
            <h1>Set Account's Password</h1>
          </S.Set_Password_Container_style>
          <SocialAccountSetPassword_Main></SocialAccountSetPassword_Main>
          <S.Set_Password_Container_style>
            <S.Set_Password_Button_style type="submit" form="social-set-password">
              Set Password
            </S.Set_Password_Button_style>
          </S.Set_Password_Container_style>
        </S.Set_Password_Main_style>
      </Page>
    </>
  );
};

export default SocialAccountSetPasswordPage;
