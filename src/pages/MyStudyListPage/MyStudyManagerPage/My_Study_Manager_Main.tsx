import React, { JSX, useEffect, useState } from "react";
import * as S from "./My_Study_Manager_Main_style";
import My_Study_Manager_Info from "./MyStudyManagerComponentPage/MyStudyManagerInfo";
import My_Study_Manager_Member from "./MyStudyManagerComponentPage/MyStudyManagerMember";
import My_Study_Manager_Schedule from "./MyStudyManagerComponentPage/MyStudyManagerSchedule";
import My_Study_Manager_Configuration from "./MyStudyManagerComponentPage/MyStudyManagerConfiguration";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import { useLocation } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { StudyDto } from "../../../utils/type";
import { HiInformationCircle, HiUsers, HiCalendar, HiCog } from "react-icons/hi";

const My_Study_Manager_Main: React.FC<{ study: StudyDto }> = ({ study }) => {
  const [category, setCategory] = useState(() => {
    return sessionStorage.getItem("My_Study_Manager_Main_category") || "info";
  });
  const [published, setPublished] = useState(study.published);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const handleResponse = HandleResponseApi.useHandleResponse();

  useEffect(() => {
    sessionStorage.setItem("My_Study_Manager_Main_category", category);
  }, [category]);

  const pageComponent: Record<string, JSX.Element> = {
    info: <My_Study_Manager_Info study={study}></My_Study_Manager_Info>,
    member: <My_Study_Manager_Member study={study}></My_Study_Manager_Member>,
    schedule: (
      <My_Study_Manager_Schedule study={study}></My_Study_Manager_Schedule>
    ),
    configuration: (
      <My_Study_Manager_Configuration
        study={study}
      ></My_Study_Manager_Configuration>
    ),
  };

  const handleOnClick = (category: string) => {
    setCategory(category);
  };

  const handleDraftOnClick = async (path: string) => {
    const response = await StudyApi.publishStudy(path);
    handleResponse(response, setPublished, { path: "", dialog: "" });
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleSection>
          <S.Title>{study.title}</S.Title>
        </S.TitleSection>
        <S.StatusBadge
          published={published}
          onClick={() => handleDraftOnClick(path)}
          data-tooltip-id="draftTooltip"
        >
          {published ? "Published" : "Draft"}
        </S.StatusBadge>
        <ReactTooltip id="draftTooltip" variant="info" place="top">
          Click to {published ? "unpublish" : "publish"} study to others
        </ReactTooltip>
      </S.Header>

      <S.TabList>
        <S.Tab
          active={"info" === category}
          onClick={() => handleOnClick("info")}
        >
          <HiInformationCircle />
          Info
        </S.Tab>

        <S.Tab
          active={"member" === category}
          onClick={() => handleOnClick("member")}
        >
          <HiUsers />
          Members
        </S.Tab>

        <S.Tab
          active={"schedule" === category}
          onClick={() => handleOnClick("schedule")}
        >
          <HiCalendar />
          Schedule
        </S.Tab>

        <S.Tab
          active={"configuration" === category}
          onClick={() => handleOnClick("configuration")}
        >
          <HiCog />
          Settings
        </S.Tab>
      </S.TabList>

      <S.ContentCard>
        {pageComponent[category]}
      </S.ContentCard>
    </S.Container>
  );
};

export default My_Study_Manager_Main;
