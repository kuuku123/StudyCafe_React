import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Member_Main_style";
import { useStudy } from "../..";
import HandleResponseApi from "../../../../../lib/HandleResponse";
import StudyApi from "../../../../../lib/apis/StudyApi";
import ProfileApi from "../../../../../lib/apis/ProfileApi";

const My_Study_Member_Main = () => {
  const [img, setImage] = useState();
  const [studyMembers, setStudyMembers] = useState([]);
  const study = useStudy();

  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleStudyMembers = (studyMembers) => {
    console.log("StudyMembers => ", studyMembers);
    setStudyMembers(studyMembers);
  };

  const handleImage = (profile_image_base64_encoded) => {
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    const getStudyMembers = async (path) => {
      const response = await StudyApi.fetchStudyMembers(path);
      handleResponse(response, handleStudyMembers, false);
    };

    const getStudyManager = async () => {
      const study_manager_image_json = await ProfileApi.fetchProfileImage();
      handleResponse(study_manager_image_json, handleImage, false);
    };

    getStudyMembers(study.path);
    getStudyManager();
  }, []);
  return (
    <>
      <S.Study_Manager_Picture_style>
        <img
          src={img}
          width="240x"
          height="240px"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        ></img>
        <figcaption style={{ textAlign: "center" }}>Study Manager</figcaption>
      </S.Study_Manager_Picture_style>
      <S.Study_Members_style>
        {Array.isArray(studyMembers) && studyMembers.length > 0 ? (
          studyMembers.map((member, index) => <></>)
        ) : (
          <>no members</>
        )}
      </S.Study_Members_style>
    </>
  );
};

export default My_Study_Member_Main;
