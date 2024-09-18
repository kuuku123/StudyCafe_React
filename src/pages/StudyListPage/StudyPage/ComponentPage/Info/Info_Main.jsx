import React, { useEffect, useState } from "react";
import * as S from "./Info_Main_style";
import { useStudy } from "../..";
import StudyApi from "../../../../../lib/StudyApi";
import HandleResponseApi from "../../../../../lib/HandleResponse";

const Study_Info_Main = () => {
  const [img, setImage] = useState();
  const study = useStudy();

  const hanldeResponse = HandleResponseApi.useHandleResponse();

  const handleImage = (profile_image_base64_encoded) => {
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    const getStudyImage = async (path) => {
      const study_image_json = await StudyApi.fetchStudyImage(path);
      hanldeResponse(study_image_json, handleImage, false);
    };
    console.log("study_main => " ,study.path)
    getStudyImage(study.path);
  }, []);
  return (
    <>
      <S.Study_Picture_style>
        <img src={img} width="720px" height="360px" style={{maxWidth: "100%", maxHeight:"100%"}}></img>
        <figcaption style={{ textAlign: "center" }}>Study Image</figcaption>
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
