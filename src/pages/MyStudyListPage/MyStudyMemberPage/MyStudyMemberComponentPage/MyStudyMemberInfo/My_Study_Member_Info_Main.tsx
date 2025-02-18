import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Member_Info_Main_style";
import { StudyDto } from "../../../../../utils/type";

const My_Study_Member_Info_Main: React.FC<{ study: StudyDto }> = ({
  study,
}) => {
  const [img, setImage] = useState<string>("");

  const handleImage = (profile_image_base64_encoded: string) => {
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    handleImage(study.studyImage);
  }, []);

  return (
    <>
      <S.Study_Picture_style>
        <img
          src={img}
          width="400px"
          height="400px"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        ></img>
        <figcaption style={{ textAlign: "center" }}>Study Image</figcaption>
      </S.Study_Picture_style>
      <S.Study_ShortDescription_style>
        <h2>Short Description</h2>
        <div>{study.shortDescription}</div>
      </S.Study_ShortDescription_style>
      <S.Study_FullDescription_style>
        <h2>Full Description</h2>
        <div
          style={{
            maxHeight: "300px",
            width: "100%",
            overflow: "auto",
          }}
          dangerouslySetInnerHTML={{ __html: study.fullDescription }}
        />
      </S.Study_FullDescription_style>
    </>
  );
};

export default My_Study_Member_Info_Main;
