import React, { useEffect, useState } from "react";
import Page from "../../component/Page";
import Title from "../../component/Title";
import CopyRight from "../../component/CopyRight";
import Hompage_Main from "./Hompage_Main";
import * as S from "./Homepage_style";
import ProfileApi from "../../component/ProfileApi";

const HomePage = () => {
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(async () => {
    const profile = await ProfileApi.fetchProfile();
    console.log("profile", profile.data.emailVerified)
    setEmailVerified(profile.data.emailVerified);
  }, []);

  return (
    <div>
      <Page
        header={
          <>
            <Title>
              <S.Header_Input_style></S.Header_Input_style>
            </Title>
            <div>{!emailVerified && "이메일 인증을 완료해라"}</div>
          </>
        }
        footer={<CopyRight></CopyRight>}
      >
        <Hompage_Main></Hompage_Main>
      </Page>
    </div>
  );
};

export default HomePage;
