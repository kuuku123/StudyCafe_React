import React from "react";
import MyEditor from "../../components/Quill-Editor/Write";
import * as S from "./CreateStudyPage_style";
const CreateStudy_Main = () => {
  return (
    <S.CreateStudy_Main_style>
      <div>스터디 개설</div>
      <div>스터디 URL</div>
      <div>스터디 이름</div>
      <div>짧은 소개</div>
      <div>상세 소개</div>
      <MyEditor></MyEditor>
    </S.CreateStudy_Main_style>
  );
};

export default CreateStudy_Main;
