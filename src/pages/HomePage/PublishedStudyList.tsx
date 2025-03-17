import React, { useEffect, useState } from "react";
import { StudyDto, StudyJoinDto, TagForm, ZoneForm } from "../../utils/type";
import StudyApi from "../../lib/apis/StudyApi";
import HandleResponseApi from "../../lib/HandleResponse";
import * as S from "./PublishedStudyList_style";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../lib/RoutesEnum";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/redux/authSelector";
import StudyManagerApi from "../../lib/apis/StudyManagerApi";

interface PublishedStudyListProps {
  tag: TagForm;
  zone: ZoneForm;
  totalStudies: number;
  pageSize: number;
  currentTag: TagForm;
}

const PublishedStudyList: React.FC<PublishedStudyListProps> = ({
  tag,
  zone,
  totalStudies,
  pageSize,
  currentTag,
}) => {
  const [studies, setStudies] = useState<StudyJoinDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalStudies / pageSize);
  const handleResponse = HandleResponseApi.useHandleResponse();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  const handleClick = async (study: StudyDto) => {
    try {
      console.log("isAuthenticated => ", isAuthenticated);
      if (isAuthenticated) {
        const response = await StudyManagerApi.amiManager(study.path);
        console.log("amiManager response:", response);
        if (response.data === true) {
          navigate(RoutesEnum.STUDY_MANAGER(study.path), { state: study });
        }
      }
      navigate(RoutesEnum.STUDY_MEMBER(study.path), { state: study });
    } catch (error) {
      console.error("Error checking manager status", error);
      navigate(RoutesEnum.STUDY_MEMBER(study.path), { state: study });
    }
  };

  const handleStudies = (studies: StudyJoinDto[]) => {
    const sanitizedStudies = Array.isArray(studies)
      ? studies.map((study) => ({
          ...study,
          fullDescription: DOMPurify.sanitize(study.fullDescription),
          studyImage: "data:image/png;base64," + study.studyImage,
        }))
      : [];
    console.log("handleMemberStudies => ", sanitizedStudies);
    setStudies(sanitizedStudies);
  };

  useEffect(() => {
    const fetchStudies = async () => {
      const response = await StudyApi.fetchStudyByTagsAndZones(
        [tag],
        [zone],
        currentPage,
        pageSize
      );
      console.log("fetchStudyByTagsAndZones => ", response);
      handleResponse(response, handleStudies, { path: "", dialog: "" });
    };
    fetchStudies();
  }, [currentPage, tag, zone, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTag]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPagination = () => {
    let pages: (number | string)[] = [];

    // Conditionally render pagination numbers:
    if (totalPages <= 5) {
      // If total pages are less than or equal to 5, show them all.
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // For more than 5 pages, we use a condensed pagination
      if (currentPage <= 4) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return (
      <S.Page_Container>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index}> ... </span>
          ) : (
            <S.PageButton
              key={index}
              active={page === currentPage}
              onClick={() => goToPage(page as number)}
            >
              {page}
            </S.PageButton>
          )
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </S.Page_Container>
    );
  };

  return (
    <>
      {/* Render your list of studies */}
      <S.Container>
        <S.List>
          {/* Check if studies is an array and has items */}
          {Array.isArray(studies) && studies.length > 0 ? (
            studies.map((study, index) => (
              <S.Card
                key={index}
                index={index}
                className={`card-${index}`}
                onClick={() => handleClick(study)}
              >
                <S.CardImage>
                  <img src={study.studyImage} alt={study.title} />
                </S.CardImage>
                <S.CardBody>
                  <h3>{study.title}</h3>
                  <p>Path: {study.path}</p>
                  <p>Short Description: {study.shortDescription}</p>
                  <S.FullDescription>
                    <summary>Full Description</summary>
                    <div
                      className="full-description"
                      dangerouslySetInnerHTML={{
                        __html: study.fullDescription,
                      }}
                    />
                  </S.FullDescription>
                </S.CardBody>
              </S.Card>
            ))
          ) : (
            <S.Card>No more published studies available</S.Card> // Fallback message when studies is empty or not yet filled
          )}
        </S.List>
      </S.Container>
      {/* Render pagination UI */}
      {renderPagination()}
    </>
  );
};

export default PublishedStudyList;
