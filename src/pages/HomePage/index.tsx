import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import Hompage_Main from "./Hompage_Main";
import * as S from "./Homepage_Main_style";
import ProfileApi from "../../lib/apis/ProfileApi";
import EmailVerification from "./EmailVerification";
import HandleResponseApi from "../../lib/HandleResponse";
import { useDispatch, useSelector } from "react-redux";
import AuthApi from "../../lib/apis/AuthApi";
import { selectAuth } from "../../lib/features/redux/authSelector";

const HomePage = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [login, setLogin] = useState(false);
  const { isAuthenticated } = useSelector(selectAuth);
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleEmailVerfieid = (data: boolean) => {
    console.log("email verified => ", data);
    setEmailVerified(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const checkEmailVefieid = async () => {
        const response = await AuthApi.checkEmailVerified();
        handleResponse(response, handleEmailVerfieid, { path: "", dialog: "" });
      };
      checkEmailVefieid();
      setLogin(true);
    }
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
