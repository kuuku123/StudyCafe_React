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
        {/* Manager Studies Section */}
        {Array.isArray(mangerStudies) && mangerStudies.length > 0 ? (
          mangerStudies.map((study, index) => (
            <S.Card
              key={`manager-${index}`}
              index={index}
              className={`card-${index}`}
              onClick={() => handleClick(study, true)}
            >
              <S.CardImage>
                <img src={study.studyImage} alt={study.title} />
              </S.CardImage>
              <S.CardBody>
                <S.RoleBadge roleType="manager">Manager</S.RoleBadge>
                <h3>{study.title}</h3>
                <p>{study.shortDescription}</p>
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
        ) : null}

        {/* Member Studies Section */}
        {Array.isArray(memberStudies) && memberStudies.length > 0 ? (
          memberStudies.map((study, index) => (
            <S.Card
              key={`member-${index}`}
              index={mangerStudies.length + index}
              className={`card-${mangerStudies.length + index}`}
              onClick={() => handleClick(study, false)}
            >
              <S.CardImage>
                <img src={study.studyImage} alt={study.title} />
              </S.CardImage>
              <S.CardBody>
                <S.RoleBadge roleType="member">Member</S.RoleBadge>
                <h3>{study.title}</h3>
                <p>{study.shortDescription}</p>
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
        ) : null}

        {/* Empty State */}
        {mangerStudies.length === 0 && memberStudies.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px", background: "white", borderRadius: "20px", border: "1px solid #f1f5f9" }}>
            <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>No studies found</h3>
            <p style={{ color: "#64748b" }}>You haven't joined or created any studies yet.</p>
          </div>
        )}
      </S.List>
    </S.Container>
  );
};

export default StudyList_Main;
