import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Member_Member_Main_style";
import HandleResponseApi from "../../../../../lib/HandleResponse";
import StudyMemberApi from "../../../../../lib/apis/StudyMemberApi";
import { AccountDto, StudyDto } from "../../../../../utils/type";

const My_Study_Member_Member_Main: React.FC<{ study: StudyDto }> = ({
  study,
}) => {
  const [img, setImage] = useState<string>();
  const [studyMembers, setStudyMembers] = useState<AccountDto[]>([]);

  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleStudyMembers = (studyMembers: AccountDto[]) => {
    console.log("StudyMembers => ", studyMembers);
    setStudyMembers(studyMembers);
  };

  const handleImage = (profile_image_base64_encoded: string) => {
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    const getStudyMembers = async (path: string) => {
      const response = await StudyMemberApi.fetchStudyMembers(path);
      handleResponse(response, handleStudyMembers, { path: "", dialog: "" });
    };

    const getStudyManager = async (path: string) => {
      const study_manager = await StudyMemberApi.fetchStudyManagers(path);
      console.log("study_manager=> ", study_manager);
      console.log("study_manager => ", study_manager.data[0]);
      handleResponse(study_manager, handleImage, { path: "", dialog: "" });
      handleImage(study_manager.data[0].profileImage);
    };
    getStudyMembers(study.path);
    getStudyManager(study.path);
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
          studyMembers.map((member, index) => (
            <div key={index}>{member.nickname}</div>
          ))
        ) : (
          <>no members</>
        )}
      </S.Study_Members_style>
    </>
  );
};

export default My_Study_Member_Member_Main;
