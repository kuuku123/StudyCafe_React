import React, { JSX, useEffect, useState } from "react";
import * as S from "./My_Study_Configuration_Main_style";
import Tags_And_Zones_Main from "./TagsAndZones/Tags_And_Zones_Main";
import Study_Description_Main from "./StudyDescription/Study_Description_Main";
import Study_Setting_Main from "./StudySetting/Study_Setting_Main";
import { StudyDto } from "../../../../../utils/type";

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
    <>
      <S.Study_List_style>
        <S.Study_List_Element_style
          onClick={() => handleOnClick("StudyDescription")}
        >
          Study Description
        </S.Study_List_Element_style>
        <S.Study_List_Element_style
          onClick={() => handleOnClick("TagsAndZones")}
        >
          Tags And Zones
        </S.Study_List_Element_style>
        <S.Study_List_Element_style
          onClick={() => handleOnClick("StudySetting")}
        >
          Study Setting
        </S.Study_List_Element_style>
      </S.Study_List_style>
      {pageComponent[category]}
    </>
  );
};

export default My_Study_Configuration_Main;
