import React from "react";
import Page from "../../../../components/Page";
import Title from "../../../../components/Title";
import * as S from "./MergeAccount_Main_style";
import CopyRight from "../../../../components/CopyRight";
import MergeAccount_Main from "./MergeAccount_Main";

const MergeAccountPage = () => {
  return (
    <>
      <Page
        header={
          <Title>
            <S.Header_Input_style></S.Header_Input_style>
          </Title>
        }
        footer={<CopyRight></CopyRight>}
      >

        <MergeAccount_Main></MergeAccount_Main>
      </Page>
    </>
  );
};

export default MergeAccountPage;