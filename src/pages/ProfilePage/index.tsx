import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import Profile_Main from "./Profile_Main";
import * as S from "./Profile_Main_style";

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
