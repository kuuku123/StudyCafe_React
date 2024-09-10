import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import Hompage_Main from "./Hompage_Main";
import * as S from "./Homepage_style";
import ProfileApi from "../../lib/ProfileApi";
import EmailVerification from "./EmailVerification";
import HandleResponseApi from "../../lib/HandleResponse";

const HomePage = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [login, setLogin] = useState(false);
  const handleResponse = HandleResponseApi.useHandleResponse()


  const handleProfileResponse = (profile_data) => {
    setEmailVerified(profile_data.emailVerified)
    if (sessionStorage.getItem("user")) setLogin(true);
  }

  useEffect(() => {
    const getProfile = async () => {
        const profile = await ProfileApi.fetchProfile();
        handleResponse(profile,handleProfileResponse,false)
    };
    getProfile();
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
              {login && !emailVerified && (
                <EmailVerification></EmailVerification>
              )}
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
