import React, { JSX, useEffect, useState } from "react";
import * as S from "./My_Study_Configuration_Main_style";
import Tags_And_Zones_Main from "./TagsAndZones/Tags_And_Zones_Main";
import Study_Description_Main from "./StudyDescription/Study_Description_Main";
import Study_Setting_Main from "./StudySetting/Study_Setting_Main";
import { StudyDto } from "../../../../../utils/type";
import { HiDocumentText, HiTag, HiAdjustments } from "react-icons/hi";

const My_Study_Configuration_Main: React.FC<{ study: StudyDto }> = ({
  study,
}) => {
  const [category, setCategory] = useState(() => {
    return (
      sessionStorage.getItem("My_Study_Configuration_Main_category") ||
      "StudyDescription"
    );
  });

  useEffect(() => {
    sessionStorage.setItem("My_Study_Configuration_Main_category", category);
  }, [category]);

  const pageComponent: Record<string, JSX.Element> = {
    StudyDescription: (
      <Study_Description_Main study={study}></Study_Description_Main>
    ),
    TagsAndZones: <Tags_And_Zones_Main study={study}></Tags_And_Zones_Main>,
    StudySetting: <Study_Setting_Main></Study_Setting_Main>,
  };

  const handleOnClick = (category: string) => {
    setCategory(category);
  };

  return (
    <S.ConfigContainer>
      <S.Sidebar>
        <S.NavItem
          active={category === "StudyDescription"}
          onClick={() => handleOnClick("StudyDescription")}
        >
          <HiDocumentText />
          Study Description
        </S.NavItem>
        <S.NavItem
          active={category === "TagsAndZones"}
          onClick={() => handleOnClick("TagsAndZones")}
        >
          <HiTag />
          Tags And Zones
        </S.NavItem>
        <S.NavItem
          active={category === "StudySetting"}
          onClick={() => handleOnClick("StudySetting")}
        >
          <HiAdjustments />
          Study Settings
        </S.NavItem>
      </S.Sidebar>
      
      <S.MainContent>
        {pageComponent[category]}
      </S.MainContent>
    </S.ConfigContainer>
  );
};

export default My_Study_Configuration_Main;
