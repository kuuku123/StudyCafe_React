import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import Hompage_Main from "./Hompage_Main";
import * as S from "./Homepage_style";
import ProfileApi from "../../components/ProfileApi";

const HomePage = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [triedLogin, setTriedLgoin] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await ProfileApi.fetchProfile();
        console.log("profile", profile);
        if (profile.data != null) {
          setTriedLgoin(true);
          setEmailVerified(profile.data.emailVerified);
        }
      } catch (error) {
        console.log("Faeild to fetch profile: ", error);
      }
    };
    getProfile();
    console.log("triedLogin ", triedLogin);
  }, []);

  return (
    <div>
      <Page
        header={
          <>
            <Title>
              <S.Header_Input_style></S.Header_Input_style>
            </Title>
            <div>
              {triedLogin && !emailVerified && "이메일 인증을 완료해라"}
            </div>
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
