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
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>My Profile</span>
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
