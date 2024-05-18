import React from "react";
import ProfileSetting_Main from "./ProfileSetting_Main";
import Page from "../../component/Page";
import Title from "../../component/Title";
import CopyRight from "../../component/CopyRight";
import * as S from "./ProfileSeting_style"

const ProfileSettingPage = () => {

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
        <ProfileSetting_Main></ProfileSetting_Main>
      </Page>
    </div>
  );
};

export default ProfileSettingPage;
