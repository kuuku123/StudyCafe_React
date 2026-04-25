import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Manager_Info_Main_style";
import { StudyDto } from "../../../../../utils/type";

const My_Study_Manager_Info_Main: React.FC<{ study: StudyDto }> = ({
  study,
}) => {
  const [img, setImage] = useState<string>("");

  const handleImage = (profile_image_base64_encoded: string) => {
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    handleImage(study.studyImage);
  }, [study.studyImage]);

  return (
    <S.InfoContainer>
      <S.Study_Picture_style>
        <img
          src={img}
          alt="Study"
        />
        <figcaption>Study Main Image</figcaption>
      </S.Study_Picture_style>
      
      <S.DescriptionSection>
        <S.Study_ShortDescription_style>
          <h2>Short Description</h2>
          <div>{study.shortDescription}</div>
        </S.Study_ShortDescription_style>
        
        <S.Study_FullDescription_style>
          <h2>Full Description</h2>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: study.fullDescription }}
          />
        </S.Study_FullDescription_style>
      </S.DescriptionSection>
    </S.InfoContainer>
  );
};

export default My_Study_Manager_Info_Main;
