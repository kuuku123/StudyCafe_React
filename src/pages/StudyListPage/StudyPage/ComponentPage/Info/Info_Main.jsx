import React, { useState } from "react";
import * as S from "./Info_Main_style";
import { useStudy } from "../..";

const Study_Info_Main = () => {
  const [img, setImage] = useState();
  const study = useStudy();
  return (
    <>
      <S.Study_Picture_style>
        <img src={img} width="720px" height="360px" style={{maxWidth: "100%", maxHeight:"100%"}}></img>
        <figcaption style={{ textAlign: "center" }}>Profile Image</figcaption>
      </S.Study_Picture_style>
      <S.Study_ShortDescription_style>
        <h2>Short Description</h2>
        <div>{study.shortDescription}</div>
      </S.Study_ShortDescription_style>
      <S.Study_FullDescription_style>
        <h2>Full Description</h2>
        <div dangerouslySetInnerHTML={{ __html: study.fullDescription }} />
      </S.Study_FullDescription_style>
    </>
  );
};

export default Study_Info_Main;
