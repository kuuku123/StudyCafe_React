import React, { useState } from "react";
import * as S from "./My_StudyPage_style";
import My_Study_Info from "./MyStudyComponentPage/MyStudyInfo";
import My_Study_Member from "./MyStudyComponentPage/MyStudyMember";
import My_Study_Schedule from "./MyStudyComponentPage/MyStudySchedule";
import My_Study_Configuration from "./MyStudyComponentPage/MyStudyConfiguration";
import { useStudy } from ".";

const Study_Main = () => {
  const [category, setCategory] = useState("member");
  const study = useStudy();

  const pageComponent = {
    info: <My_Study_Info></My_Study_Info>,
    member: <My_Study_Member></My_Study_Member>,
    schedule: <My_Study_Schedule></My_Study_Schedule>,
    configuration: <My_Study_Configuration></My_Study_Configuration>,
  };

  const handleOnClick = (category) => {
    setCategory(category);
  };
  return (
    <S.Grid_Container_style>
      <S.Study_Title_style>
        <h1>{study.title}</h1>
      </S.Study_Title_style>
      <S.Study_Draft_style>
        <span>draft</span>
        <span>off</span>
      </S.Study_Draft_style>
      <S.Study_Link_style>
        <S.Study_Component_Click_style
          clicked={"info" === category}
          onClick={() => handleOnClick("info")}
        >
          Info
        </S.Study_Component_Click_style>

        <S.Study_Component_Click_style
          clicked={"member" === category}
          onClick={() => handleOnClick("member")}
        >
          Member
        </S.Study_Component_Click_style>

        <S.Study_Component_Click_style
          clicked={"schedule" === category}
          onClick={() => handleOnClick("schedule")}
        >
          Schedule
        </S.Study_Component_Click_style>

        <S.Study_Component_Click_style
          clicked={"configuration" === category}
          onClick={() => handleOnClick("configuration")}
        >
          Configuration
        </S.Study_Component_Click_style>
      </S.Study_Link_style>

      <S.Study_Link_Horizontal_Line_style></S.Study_Link_Horizontal_Line_style>
      {pageComponent[category]}
    </S.Grid_Container_style>
  );
};

export default Study_Main;
