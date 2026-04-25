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
import { HiInformationCircle, HiUsers, HiCalendar, HiLogout, HiLogin } from "react-icons/hi";

const My_Study_Member_Main: React.FC<{ study: StudyDto }> = ({ study }) => {
  const [category, setCategory] = useState(() => {
    return sessionStorage.getItem("My_Study_Member_Main_category") || "info";
  });
  const [joined, setJoined] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const handleResponse = HandleResponseApi.useHandleResponse();
  const { isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    sessionStorage.setItem("My_Study_Member_Main_category", category);
  }, [category]);

  useEffect(() => {
    if (isAuthenticated) {
      async function checkStudyJoined() {
        try {
          const response = await StudyApi.checkStudyJoined(path);
          setJoined(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      checkStudyJoined();
    }
  }, [isAuthenticated, path]);

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
      handleResponse(response, () => setJoined(!joined), {
        path: "",
        dialog: "",
      });
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleSection>
          <S.Title>{study.title}</S.Title>
        </S.TitleSection>
        
        <S.JoinBadge
          joined={joined}
          onClick={() => handleJoinOnClick(path)}
          data-tooltip-id="joinTooltip"
        >
          {joined ? <><HiLogout style={{marginRight: '8px'}}/> Leave</> : <><HiLogin style={{marginRight: '8px'}}/> Join</>}
        </S.JoinBadge>
        
        <ReactTooltip id="joinTooltip" variant="info" place="top">
          {!isAuthenticated
            ? "Login to join"
            : !joined
            ? "Click to join current Study"
            : "Click to Leave Study"}
        </ReactTooltip>
      </S.Header>

      <S.TabList>
        <S.Tab
          active={"info" === category}
          onClick={() => handleOnClick("info")}
          data-tooltip-id="infoTooltip"
        >
          <HiInformationCircle />
          Info
        </S.Tab>
        <ReactTooltip id="infoTooltip" variant="info" place="top">
          {!isAuthenticated && "Login to navigate"}
        </ReactTooltip>

        <S.Tab
          active={"member" === category}
          onClick={() => handleOnClick("member")}
          data-tooltip-id="memberTooltip"
        >
          <HiUsers />
          Members
        </S.Tab>
        <ReactTooltip id="memberTooltip" variant="info" place="top">
          {!isAuthenticated && "Login to navigate"}
        </ReactTooltip>

        <S.Tab
          active={"schedule" === category}
          onClick={() => handleOnClick("schedule")}
          data-tooltip-id="scheduleTooltip"
        >
          <HiCalendar />
          Schedule
        </S.Tab>
        <ReactTooltip id="scheduleTooltip" variant="info" place="top">
          {!isAuthenticated && "Login to navigate"}
        </ReactTooltip>
      </S.TabList>

      <S.ContentCard>
        {pageComponent[category]}
      </S.ContentCard>
    </S.Container>
  );
};

export default My_Study_Member_Main;
