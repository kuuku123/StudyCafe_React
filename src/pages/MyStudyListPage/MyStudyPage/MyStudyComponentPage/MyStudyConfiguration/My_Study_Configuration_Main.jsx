import React, { useState } from "react";
import * as S from "./My_Study_Configuration_Main_style";
import { useStudy } from "../..";
import Tags_And_Zones_Main from "./TagsAndZones/Tags_And_Zones_Main";
import Study_Description_Main from "./StudyDescription/Study_Description_Main";
import Study_Banner_Image from "./StudyBannerImage/Study_Banner_Image";
import Study_Title_Main from "./StudyTitle/Study_Title_Main";
import Study_Life_Main from "./StudyLife/Study_Life_Main";

const My_Study_Configuration_Main = () => {
  const [category, setCategory] = useState("StudyDescription");
  const study = useStudy();
  const pageComponent = {
    StudyDescription: <Study_Description_Main></Study_Description_Main>,
    StudyBannerImage: <Study_Banner_Image></Study_Banner_Image>,
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
        <S.Study_List_Element_style
          onClick={() => handleOnClick("StudyBannerImage")}
        >
          Study Banner Image
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
