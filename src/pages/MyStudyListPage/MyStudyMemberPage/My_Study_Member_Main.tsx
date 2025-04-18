import React, { JSX, useEffect, useState } from "react";
import * as S from "./My_Study_Member_Main_style";
import { useLocation } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import My_Study_Member_Schedule from "./MyStudyMemberComponentPage/MyStudyMemberSchedule";
import My_Study_Member_Info from "./MyStudyMemberComponentPage/MyStudyMemberInfo";
import My_Study_Member_Member from "./MyStudyMemberComponentPage/MyStudyMemberMember";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import { StudyDto } from "../../../utils/type";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../lib/features/redux/authSelector";

const My_Study_Member_Main: React.FC<{ study: StudyDto }> = ({ study }) => {
  const [category, setCategory] = useState(() => {
    return sessionStorage.getItem("My_Study_Member_Main_category") || "info";
  });
  const [joined, setJoined] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const handleResponse = HandleResponseApi.useHandleResponse();
  const { user, isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    sessionStorage.setItem("My_Study_Member_Main_category", category);
  }, [category]);

  useEffect(() => {
    if (isAuthenticated) {
      async function checkStudyJoined() {
        try {
          const response = await StudyApi.checkStudyJoined(path);
          console.log("checkStudyJoined => ", response);
          setJoined(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      checkStudyJoined();
    }
  });

  const pageComponent: Record<string, JSX.Element> = {
    info: <My_Study_Member_Info study={study}></My_Study_Member_Info>,
    member: <My_Study_Member_Member study={study}></My_Study_Member_Member>,
    schedule: (
      <My_Study_Member_Schedule study={study}></My_Study_Member_Schedule>
    ),
  };

  const handleOnClick = (category: string) => {
    if (isAuthenticated) {
      setCategory(category);
    }
  };

  const handleJoinOnClick = async (path: string) => {
    if (isAuthenticated) {
      let response = null;
      if (joined) {
        response = await StudyApi.leaveStudy(path);
      } else {
        response = await StudyApi.joinStudy(path);
      }
      console.log("handleJoinOnCLick => ", response);
      handleResponse(response, () => setJoined(!joined), {
        path: "",
        dialog: "",
      });
    }
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
        <ReactTooltip id="draftTooltip" variant="info" place="top">
          {!isAuthenticated
            ? "Login to join"
            : !joined
            ? "Click to join current Study"
            : "Click to Leave Study"}
        </ReactTooltip>
      </S.Study_Draft_style>
      <S.Study_Link_style>
        <S.Study_Component_Click_style
          clicked={"info" === category}
          onClick={() => handleOnClick("info")}
          data-tooltip-id="infoTooltip"
        >
          Info
        </S.Study_Component_Click_style>
        <ReactTooltip id="infoTooltip" variant="info" place="top">
          {!isAuthenticated && "Login to navigate"}
        </ReactTooltip>

        <S.Study_Component_Click_style
          clicked={"member" === category}
          onClick={() => handleOnClick("member")}
          data-tooltip-id="memberTooltip"
        >
          Member
        </S.Study_Component_Click_style>
        <ReactTooltip id="memberTooltip" variant="info" place="top">
          {!isAuthenticated && "Login to navigate"}
        </ReactTooltip>

        <S.Study_Component_Click_style
          clicked={"schedule" === category}
          onClick={() => handleOnClick("schedule")}
          data-tooltip-id="scheduleTooltip"
        >
          Schedule
        </S.Study_Component_Click_style>
        <ReactTooltip id="scheduleTooltip" variant="info" place="top">
          {!isAuthenticated && "Login to navigate"}
        </ReactTooltip>
      </S.Study_Link_style>

      <S.Study_Link_Horizontal_Line_style></S.Study_Link_Horizontal_Line_style>
      {pageComponent[category]}
    </S.Grid_Container_style>
  );
};

export default My_Study_Member_Main;
