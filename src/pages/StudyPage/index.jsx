import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import * as S from "./StudyPage_style";
import CopyRight from "../../components/CopyRight";
import Study_Main from "./Study_Main";

const StudyPage = () => {
  return (
    <div>
      <Page
        header={
          <>
            <Title>
              <S.Header_Input_style></S.Header_Input_style>
            </Title>
          </>
        }
        footer={<CopyRight></CopyRight>}
      >
        <Study_Main></Study_Main>
      </Page>
    </div>
  );
};

export default StudyPage;
