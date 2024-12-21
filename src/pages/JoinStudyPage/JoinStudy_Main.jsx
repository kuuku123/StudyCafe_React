import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./JoinStudy_Main_style";
import StudyApi from "../../lib/apis/StudyApi";
import TagApi from "../../lib/apis/TagApi";
import ZoneApi from "../../lib/apis/ZoneApi";
import HandleResponseApi from "../../lib/HandleResponse";
import { Link } from "react-router-dom";
import RoutesEnum from "../../lib/RoutesEnum";

const JoinStudy_Main = () => {
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedZone, setSelectedZone] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const [studies, setStudies] = useState([]);
  const [uniqueZones, setUniqueZones] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([
    { value: "health", label: "health" },
    { value: "computer-science", label: "computer-science" },
    { value: "mathematics", label: "mathematics" },
    { value: "physics", label: "physics" },
    { value: "biology", label: "biology" },
    { value: "chemistry", label: "chemistry" },
    { value: "literature", label: "literature" },
    { value: "history", label: "history" },
    { value: "economics", label: "economics" },
    { value: "psychology", label: "psychology" },
    { value: "engineering", label: "engineering" },
    { value: "philosophy", label: "philosophy" },
  ]);

  const handleResponse = HandleResponseApi.useHandleResponse();

  const ITEMS_PER_PAGE = 1; // Number of items per page
  const pagesToShow = 5; // How many page numbers you want to display at a time

  // Filter studies based on selected tag and zone
  const filteredStudies = studies.filter((study) => {
    console.log("study => ", study);
    console.log("selectedZone ", selectedZone);
    let matchesTag =
      selectedTag &&
      selectedTag.some((tag) =>
        study.tagDtoList.some((tagDto) => tagDto.title === tag.value)
      );
    let matchesZone =
      selectedZone &&
      selectedZone.some((zone) =>
        study.zoneDtoList.some((zoneDto) => zoneDto.city === zone.value.city)
      );

    if (selectedTag.length == 0) {
      matchesTag = true;
    }
    if (selectedZone.length == 0) {
      matchesZone = true;
    }

    console.log("matchesTag, matchesZone ", matchesTag, matchesZone);
    return matchesTag || matchesZone;
  });

  // Pagination logic
  const totalPages = Math.ceil(studies.length / ITEMS_PER_PAGE);

  const startIndex = ((currentPage - 1) * ITEMS_PER_PAGE) % pagesToShow;
  const paginatedStudies = filteredStudies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  console.log(
    "totalPages,filteredStudies , startIndex, paginatedStudies, pageGroupStart ",
    totalPages,
    filteredStudies,
    startIndex,
    paginatedStudies,
    pageGroupStart
  );

  const handleNextGroup = () => {
    const nextStart = pageGroupStart + pagesToShow;
    if (nextStart <= totalPages) {
      setPageGroupStart(nextStart);
      setCurrentPage(nextStart);
    }
  };

  const handlePrevGroup = () => {
    const prevStart = pageGroupStart - pagesToShow;
    if (prevStart > 0) {
      setPageGroupStart(prevStart);
      setCurrentPage(prevStart);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: Math.min(pagesToShow, totalPages - pageGroupStart + 1) },
    (_, i) => pageGroupStart + i
  );

  // Handlers
  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
    setCurrentPage(1); // Reset to first page when tag changes
  };
  const handleZoneChange = (selectedOption) => {
    setSelectedZone(selectedOption);
    setCurrentPage(1); // Reset to first page when zone changes
  };

  const parseZones = (zones) => {
    const mappedCities = zones.map((cityObj) => ({
      value: { city: cityObj.city, province: cityObj.province },
      label: cityObj.city,
    }));
    setUniqueZones(mappedCities);
  };
  useEffect(() => {
    console.log("useEffect");
    console.log("selectedTag => ", selectedTag);
    const getFetchStudyByTagsAndZones = async (
      newTags,
      newZones,
      page,
      size
    ) => {
      const response = await StudyApi.fetchStudyByTagsAndZones(
        newTags,
        newZones,
        page,
        size
      );
      console.log("fetchStudyBytagsAndZones => ", response);
      handleResponse(response, setStudies, false);
    };
    const newTags = selectedTag
      ? TagApi.changeTagLabelToTitile(selectedTag)
      : null;
    const newZones = selectedZone
      ? ZoneApi.changeZoneLabelToCity(selectedZone)
      : null;
    getFetchStudyByTagsAndZones(
      newTags,
      newZones,
      Math.ceil(pageGroupStart / pagesToShow),
      pagesToShow * ITEMS_PER_PAGE
    );
  }, [selectedTag, selectedZone, pageGroupStart]);

  useEffect(() => {
    const getAllZones = async () => {
      const response = await ZoneApi.getAllZones();
      handleResponse(response, parseZones, false);
    };
    getAllZones();
  }, []);

  return (
    <S.StudyListContainer>
      {/* Filters on the left */}
      <S.FiltersContainer>
        {/* Searchable Tag Dropdown */}
        <Select
          value={selectedTag}
          onChange={handleTagChange}
          options={uniqueTags}
          isClearable
          isMulti
          placeholder="Search and select tag..."
        />

        {/* Searchable Zone Dropdown */}
        <Select
          value={selectedZone}
          onChange={handleZoneChange}
          options={uniqueZones}
          isClearable
          isMulti
          placeholder="Search and select zone..."
        />
      </S.FiltersContainer>

      {/* Study list and pagination on the right */}
      <S.StudyResultsContainer>
        {/* Display Studies */}
        {paginatedStudies.length > 0 ? (
          paginatedStudies.map((study) => (
            <Link to={RoutesEnum.STUDY_GUEST(study.path)}>
              <S.StudyCard key={study.id}>
                <S.Title>{study.title}</S.Title>
                {study.shortDescription}
                <S.Zones>
                  {study.zoneDtoList.map((zone) => (
                    <S.Zone>{zone.city}</S.Zone>
                  ))}
                </S.Zones>
                <S.Tags>
                  {study.tagDtoList.map((tag) => (
                    <S.Tag key={tag.title}>{tag.title}</S.Tag>
                  ))}
                </S.Tags>
              </S.StudyCard>
            </Link>
          ))
        ) : (
          <p>No studies found for the selected filters.</p>
        )}
        {/* Pagination */}
        <S.Pagination>
          <S.PageButton
            onClick={handlePrevGroup}
            disabled={pageGroupStart === 1}
          >
            Prev
          </S.PageButton>
          {pageNumbers.map((page) => (
            <S.PageButton
              key={page}
              onClick={() => handlePageClick(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </S.PageButton>
          ))}
          <S.PageButton
            onClick={handleNextGroup}
            disabled={pageGroupStart + pagesToShow > totalPages}
          >
            Next
          </S.PageButton>
        </S.Pagination>
      </S.StudyResultsContainer>
    </S.StudyListContainer>
  );
};

export default JoinStudy_Main;
