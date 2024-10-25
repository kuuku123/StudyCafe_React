import React, { useState } from "react";
import * as S from "./My_Study_Configuration_Main_style";
import { useStudy } from "../..";
import Tags_And_Zones_Main from "./TagsAndZones/Tags_And_Zones_Main";
import Study_Description_Main from "./StudyDescription/Study_Description_Main";
import Study_Title_Main from "./StudyTitle/Study_Title_Main";
import Study_Life_Main from "./StudyLife/Study_Life_Main";

const My_Study_Configuration_Main = ({ study }) => {
  console.log("mystudyconfig ", study);
  const [category, setCategory] = useState("StudyDescription");
  const pageComponent = {
    StudyDescription: (
      <Study_Description_Main study={study}></Study_Description_Main>
    ),
    StudyTitle: <Study_Title_Main></Study_Title_Main>,
    TagsAndZones: <Tags_And_Zones_Main study={study}></Tags_And_Zones_Main>,
    StudyLife: <Study_Life_Main></Study_Life_Main>,
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
        <S.Study_List_Element_style onClick={() => handleOnClick("StudyTitle")}>
          Study Title
        </S.Study_List_Element_style>
        <S.Study_List_Element_style
          onClick={() => handleOnClick("TagsAndZones")}
        >
          Tags And Zones
        </S.Study_List_Element_style>
        <S.Study_List_Element_style onClick={() => handleOnClick("StudyLife")}>
          Study
        </S.Study_List_Element_style>
      </S.Study_List_style>
      {pageComponent[category]}
    </>
  );
};

export default My_Study_Configuration_Main;
