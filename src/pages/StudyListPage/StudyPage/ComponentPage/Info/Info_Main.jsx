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
    console.log("at handle Image => ", profile_image_base64_encoded);
    const base64WithoutHeader = profile_image_base64_encoded.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    // Convert Base64 to binary string
    const binaryString = atob(base64WithoutHeader);

    // Convert binary string to array of 8-bit unsigned integers
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "image/jpeg" });
    // const profile_image = profile_image_base64_encoded.blob();
    const url = URL.createObjectURL(blob);
    setImage(url);
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
