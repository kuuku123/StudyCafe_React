import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Main_style";
import My_Study_Info from "./MyStudyComponentPage/MyStudyInfo";
import My_Study_Member from "./MyStudyComponentPage/MyStudyMember";
import My_Study_Schedule from "./MyStudyComponentPage/MyStudySchedule";
import My_Study_Configuration from "./MyStudyComponentPage/MyStudyConfiguration";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import { useLocation } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";

const My_Study_Main = ({ study }) => {
  const [category, setCategory] = useState(() => {
    return sessionStorage.getItem("My_Study_Main_category") || "info";
  });
  const [published, setPublished] = useState(study.published);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const handleResponse = HandleResponseApi.useHandleResponse();

  useEffect(() => {
    sessionStorage.setItem("My_Study_Main_category", category);
  }, [category]);

  const pageComponent = {
    info: <My_Study_Info study={study}></My_Study_Info>,
    member: <My_Study_Member study={study}></My_Study_Member>,
    schedule: <My_Study_Schedule study={study}></My_Study_Schedule>,
    configuration: (
      <My_Study_Configuration study={study}></My_Study_Configuration>
    ),
  };

  const handleOnClick = (category) => {
    setCategory(category);
  };

  const handleDraftOnClick = async (path) => {
    const response = await StudyApi.publishStudy(path);
    console.log("handleDraftOnCLick => ", response);
    handleResponse(response, setPublished, false);
  };

  return (
    <S.Grid_Container_style>
      <S.Study_Title_style>
        <h1>{study.title}</h1>
      </S.Study_Title_style>
      <S.Study_Draft_style>
        <S.Study_Component_Click_style
          data-tooltip-id="draftTooltip"
          fontSize="22px"
          onClick={() => handleDraftOnClick(path)}
        >
          {published ? "Published" : "Draft"}
        </S.Study_Component_Click_style>
        <ReactTooltip id="draftTooltip" effect="solid" place="top">
          Click to Pubslih Study to Others
        </ReactTooltip>
        <S.Study_Component_Click_style fontSize="22px">
          off
        </S.Study_Component_Click_style>
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

export default My_Study_Main;
