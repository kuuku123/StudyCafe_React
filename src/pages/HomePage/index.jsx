import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import Hompage_Main from "./Hompage_Main";
import * as S from "./Homepage_Main_style";
import ProfileApi from "../../lib/ProfileApi";
import EmailVerification from "./EmailVerification";
import HandleResponseApi from "../../lib/HandleResponse";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [login, setLogin] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setLogin(true);
      setEmailVerified(user.emailVerified);
    }
    const getXsrfToken = async () => {
      const xsrfToken = await ProfileApi.xsrfToken();
    };
    getXsrfToken();
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
