import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Member_Main_style";
import { useLocation } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import My_Study_Member_Schedule from "./MyStudyMemberComponentPage/MyStudyMemberSchedule";
import My_Study_Member_Info from "./MyStudyMemberComponentPage/MyStudyMemberInfo";
import My_Study_Member_Member from "./MyStudyMemberComponentPage/MyStudyMemberMember";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";

const My_Study_Member_Main = ({ study }) => {
  const [category, setCategory] = useState(() => {
    return sessionStorage.getItem("My_Study_Member_Main_category") || "info";
  });
  const [joined, setJoined] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const handleResponse = HandleResponseApi.useHandleResponse();

  useEffect(() => {
    sessionStorage.setItem("My_Study_Member_Main_category", category);
  }, [category]);

  useEffect(() => {
    async function checkStudyJoined() {
      try {
        const response = await StudyApi.checkStudyJoined(path)
        console.log("checkStudyJoined => " ,response)
        setJoined(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    checkStudyJoined();
  })

  const pageComponent = {
    info: <My_Study_Member_Info study={study}></My_Study_Member_Info>,
    member: <My_Study_Member_Member study={study}></My_Study_Member_Member>,
    schedule: (
      <My_Study_Member_Schedule study={study}></My_Study_Member_Schedule>
    ),
  };

  const handleOnClick = (category) => {
    setCategory(category);
  };

  const handleJoinOnClick = async (path) => {
    let response = null;
    if (joined) {
      response = await StudyApi.leaveStudy(path);
    } else {
      response = await StudyApi.joinStudy(path);
    }
    console.log("handleJoinOnCLick => ", response);
    handleResponse(response, () => setJoined(!joined), false);
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
          onClick={() => handleJoinOnClick(path)}
        >
          {!joined ? "Join" : "Leave"}
        </S.Study_Component_Click_style>
        <ReactTooltip id="draftTooltip" effect="solid" place="top">
          {!joined ? "Click to join current Study" : "Click to Leave Study"}
        </ReactTooltip>
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
      </S.Study_Link_style>

      <S.Study_Link_Horizontal_Line_style></S.Study_Link_Horizontal_Line_style>
      {pageComponent[category]}
    </S.Grid_Container_style>
  );
};

export default My_Study_Member_Main;
