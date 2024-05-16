import React, { useEffect, useState } from "react";
import Page from "../../component/Page";
import Title from "../../component/Title";
import CopyRight from "../../component/CopyRight";
import styled from "styled-components";
import Hompage_Main from "./Hompage_Main";

const HomePage = () => {
  const Header_Input_style = styled.input`
    margin-left: 10px;
    font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none; /* Remove the default focus outline */
    transition: border-color 0.3s ease; /* Smooth transition for border color */
    height: auto;
  `;

  const [emailVerified, setEmailVerified] = useState()

  useEffect(() => {
    async function fetchEmailVerification() {
      const raw_info = await fetch("",
        {
          credentials: "include",
          method: "GET",
        }
      )
      const result = await raw_info.json();
    }
    


  },[])

  return (
    <div>
      <Page
        header={
          <>
            <Title>
              <Header_Input_style></Header_Input_style>
            </Title>
            <div>이메일 인증을 완료해라</div>
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
