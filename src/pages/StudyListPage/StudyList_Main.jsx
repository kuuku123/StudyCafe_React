import React, { useState, useEffect } from "react";
import StudyApi from "../../lib/StudyApi";
import HandleResponseApi from "../../lib/HandleResponse";
import * as S from "./StudyListPage_style";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const StudyList_Main = () => {
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate();
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleClick = (study) => {
    console.log("study => " , study)
    navigate("/study/" + study.path, { state: study });
  };
  const handleStudies = (studies) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map((study) => ({
          ...study,
          cleanHtml: DOMPurify.sanitize(study.fullDescription),
        }))
      : [];
    setStudies(sanitizedStudies);
  };
  useEffect(() => {
    const getStudyList = async () => {
      const response = await StudyApi.fetchStudyList();

      handleResponse(response, handleStudies, false);
    };
    getStudyList();
  }, []);

  return (
    <>
      <h2>Study List</h2>
      <S.List>
        {/* Check if studies is an array and has items */}
        {Array.isArray(studies) && studies.length > 0 ? (
          studies.map((study, index) => (
            <S.Card key={index} index={index} className={`card-${index}`} onClick={() => handleClick(study)}>
              {/* Space for the image */}
              <S.CardImage>
                <img src={study.image} alt={study.title} />
              </S.CardImage>
              <S.CardBody>
                <h3>{study.title}</h3>
                <p>Path: {study.path}</p>
                <p>Short Description: {study.shortDescription}</p>
                <S.FullDescription>
                  <summary>Full Description</summary>
                  <div className="full-description"
                    dangerouslySetInnerHTML={{ __html: study.fullDescription }}
                  />
                </S.FullDescription>
              </S.CardBody>
            </S.Card>
          ))
        ) : (
          <S.Card>No studies available</S.Card> // Fallback message when studies is empty or not yet filled
        )}
      </S.List>
    </>
  );
};

export default StudyList_Main;
