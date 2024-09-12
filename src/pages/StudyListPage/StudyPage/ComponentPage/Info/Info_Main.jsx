import React from "react";
import * as S from "./Info_Main_style";
import { useStudy } from "../..";

const Study_Info_Main = () => {
  const study = useStudy()
  return (
    <>
      <S.Study_ShortDescription_style>
        {study.shortDescription}
      </S.Study_ShortDescription_style>
      <S.Study_LongDescription_style>
        <div dangerouslySetInnerHTML={{ __html: study.fullDescription }} />
      </S.Study_LongDescription_style>
    </>
  );
};

export default Study_Info_Main;
