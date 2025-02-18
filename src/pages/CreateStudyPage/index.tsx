import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import * as S from "./CreateStudy_Main_style";
import CopyRight from "../../components/CopyRight";
import CreateStudy_Main from "./CreateStudy_Main";

const CreateStudyPage = () => {
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
        <CreateStudy_Main></CreateStudy_Main>
      </Page>
    </div>
  );
};

export default CreateStudyPage;
