import React from "react";
import * as S from "./StudyListPage_style";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import StudyList_Main from "./StudyList_Main";

const StudyListPage = () => {
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
        <StudyList_Main></StudyList_Main>
      </Page>
    </div>
  );
};

export default StudyListPage;
