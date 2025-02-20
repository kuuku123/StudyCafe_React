import React, { useState, useEffect } from "react";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";
import StudyMemberApi from "../../lib/apis/StudyMemberApi";
import HandleResponseApi from "../../lib/HandleResponse";
import * as S from "./MyStudyList_Main_style";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../lib/RoutesEnum";
import { StudyDto } from "../../utils/type";

const StudyList_Main = () => {
  const [mangerStudies, setManagerStudies] = useState<StudyDto[]>([]);
  const [memberStudies, setMemberStudies] = useState<StudyDto[]>([]);
  const navigate = useNavigate();
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleClick = (study: StudyDto, isManager: boolean) => {
    console.log("study => ", study);
    if (isManager) {
      navigate(RoutesEnum.STUDY_MANAGER(study.path), { state: study });
    } else {
      navigate(RoutesEnum.STUDY_MEMBER(study.path), { state: study });
    }
  };
  const handleManagerStudies = (studies: StudyDto[]) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map((study) => ({
          ...study,
          fullDescription: DOMPurify.sanitize(study.fullDescription),
          studyImage: "data:image/png;base64," + study.studyImage,
        }))
      : [];
    console.log("sanitizedStudies => ", sanitizedStudies);
    setManagerStudies(sanitizedStudies);
  };

  const handleMemberStudies = (studies: StudyDto[]) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map((study) => ({
          ...study,
          fullDescription: DOMPurify.sanitize(study.fullDescription),
          studyImage: "data:image/png;base64," + study.studyImage,
        }))
      : [];
    console.log("handleMemberStudies => ", sanitizedStudies);
    setMemberStudies(sanitizedStudies);
  };

  useEffect(() => {
    const getManagerStudyList = async () => {
      const response = await StudyManagerApi.fetchStudyList();

      handleResponse(response, handleManagerStudies, { path: "", dialog: "" });
    };
    const getMemberStudyList = async () => {
      const response = await StudyMemberApi.fetchStudyList();

      handleResponse(response, handleMemberStudies, { path: "", dialog: "" });
    };
    getManagerStudyList();
    getMemberStudyList();
  }, []);

  return (
    <S.Container>
      <h2>My Study List</h2>
      <S.List>
        {/* Check if studies is an array and has items */}
        {Array.isArray(mangerStudies) && mangerStudies.length > 0 ? (
          mangerStudies.map((study, index) => (
            <S.Card
              key={index}
              index={index}
              className={`card-${index}`}
              onClick={() => handleClick(study, true)}
            >
              <S.CardImage>
                <img src={study.studyImage} alt={study.title} />
              </S.CardImage>
              <S.CardBody>
                <h3>MANAGER</h3>
                <h3>{study.title}</h3>
                <p>Path: {study.path}</p>
                <p>Short Description: {study.shortDescription}</p>
                <S.FullDescription>
                  <summary>Full Description</summary>
                  <div
                    className="full-description"
                    dangerouslySetInnerHTML={{ __html: study.fullDescription }}
                  />
                </S.FullDescription>
              </S.CardBody>
            </S.Card>
          ))
        ) : (
          <S.Card>No manager studies available</S.Card> // Fallback message when studies is empty or not yet filled
        )}
        {/* Check if studies is an array and has items */}
        {Array.isArray(memberStudies) && memberStudies.length > 0 ? (
          memberStudies.map((study, index) => (
            <S.Card
              key={index}
              index={index}
              className={`card-${index}`}
              onClick={() => handleClick(study, false)}
            >
              <S.CardImage>
                <img src={study.studyImage} alt={study.title} />
              </S.CardImage>
              <S.CardBody>
                <h3>MEMBER</h3>
                <h3>{study.title}</h3>
                <p>Path: {study.path}</p>
                <p>Short Description: {study.shortDescription}</p>
                <S.FullDescription>
                  <summary>Full Description</summary>
                  <div
                    className="full-description"
                    dangerouslySetInnerHTML={{ __html: study.fullDescription }}
                  />
                </S.FullDescription>
              </S.CardBody>
            </S.Card>
          ))
        ) : (
          <S.Card>No member studies available</S.Card> // Fallback message when studies is empty or not yet filled
        )}
      </S.List>
    </S.Container>
  );
};

export default StudyList_Main;
