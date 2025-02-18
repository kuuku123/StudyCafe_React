import React from "react";
import JoinStudy_Main from "./JoinStudy_Main";
import Page from "../../components/Page";
import CopyRight from "../../components/CopyRight";
import Title from "../../components/Title";
import * as S from "./JoinStudy_Main_style";

const PublicStudyPage = () => {
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
        <JoinStudy_Main></JoinStudy_Main>
      </Page>
    </div>
  );
};

export default PublicStudyPage;
