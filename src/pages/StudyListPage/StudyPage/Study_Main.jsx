import React, { useState } from "react";
import * as S from "./StudyPage_style";
import { Link, useLocation } from "react-router-dom";
import * as style from "../../../components/Component_style";
import Study_Info from "./ComponentPage/Info";
import Study_Member from "./ComponentPage/Member";
import Study_Schedule from "./ComponentPage/Schedule";
import Study_Configuration from "./ComponentPage/Configuration";

const Study_Main = ({study}) => {
  console.log("studyin -> ", study)
  const [category, setCategory] = useState("info");
  const pageComponent = {
    info: <Study_Info study={study}></Study_Info>,
    member: <Study_Member study={study}></Study_Member>,
    schedule: <Study_Schedule study={study}></Study_Schedule>,
    configuration: <Study_Configuration study={study}></Study_Configuration>,
  };

  const handleOnClick = (category) => {
    setCategory(category);
  };
  return (
    <S.Grid_Container_style>
      <S.Study_Title_style>
        <span>{study && study.title}</span>
        <span>{study && study.path}</span>
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
