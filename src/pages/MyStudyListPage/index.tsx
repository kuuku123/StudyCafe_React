import React from "react";
import * as S from "./MyStudyList_Main_style";
import Page from "../../components/Page";
import Title from "../../components/Title";
import CopyRight from "../../components/CopyRight";
import MyStudyList_Main from "./MyStudyList_Main";

const MyStudyListPage = () => {
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
        <MyStudyList_Main></MyStudyList_Main>
      </Page>
    </div>
  );
};

export default MyStudyListPage;
