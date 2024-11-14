import React, { useState } from "react";
import * as S from "./My_Study_Configuration_Main_style";
import Tags_And_Zones_Main from "./TagsAndZones/Tags_And_Zones_Main";
import Study_Description_Main from "./StudyDescription/Study_Description_Main";
import Study_Setting_Main from "./StudySetting/Study_Setting_Main";

const My_Study_Configuration_Main = ({ study }) => {
  console.log("mystudyconfig ", study);
  const [category, setCategory] = useState("StudyDescription");
  const pageComponent = {
    StudyDescription: (
      <Study_Description_Main study={study}></Study_Description_Main>
    ),
    TagsAndZones: <Tags_And_Zones_Main study={study} setCategory={setCategory}></Tags_And_Zones_Main>,
    StudySetting: <Study_Setting_Main></Study_Setting_Main>,
  };
  const handleOnClick = (category) => {
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
        <S.Study_List_Element_style onClick={() => handleOnClick("StudySetting")}>
          Study Setting
        </S.Study_List_Element_style>
      </S.Study_List_style>
      {pageComponent[category]}
    </>
  );
};

export default My_Study_Configuration_Main;
