import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Guest_Main_style";
import { useLocation } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import My_Study_Guest_Schedule from "./MyStudyGuestComponentPage/MyStudyGuestSchedule";
import My_Study_Guest_Info from "./MyStudyGuestComponentPage/MyStudyGuestInfo";
import My_Study_Guest_Member from "./MyStudyGuestComponentPage/MyStudyGuestMember";

const My_Study_Guest_Main = ({ study }) => {
  const [category, setCategory] = useState(() => {
    return sessionStorage.getItem("My_Study_Guest_Main_category") || "info";
  });
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    sessionStorage.setItem("My_Study_Guest_Main_category", category);
  }, [category]);

  const pageComponent = {
    info: <My_Study_Guest_Info study={study}></My_Study_Guest_Info>,
    member: <My_Study_Guest_Member study={study}></My_Study_Guest_Member>,
    schedule: <My_Study_Guest_Schedule study={study}></My_Study_Guest_Schedule>,
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
        <S.Study_Component_Click_style
          data-tooltip-id="draftTooltip"
          fontSize="22px"
          onClick={() => handleDraftOnClick(path)}
        ></S.Study_Component_Click_style>
        <ReactTooltip id="draftTooltip" effect="solid" place="top">
          Click to Pubslih Study to Others
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

export default My_Study_Guest_Main;
