import React from "react";
import Page from "../../component/Page";
import Title from "../../component/Title";
import CopyRight from "../../component/CopyRight";
import Profile_Main from "./Profile_Main";
import * as S from "./Profile_style";

const ProfilePage = () => {
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
        <Profile_Main></Profile_Main>
      </Page>
    </div>
  );
};

export default ProfilePage;
