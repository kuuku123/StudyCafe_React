import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./JoinStudy_Main_style";
import { GiConsoleController } from "react-icons/gi";
import StudyApi from "../../lib/apis/StudyApi";
import TagApi from "../../lib/apis/TagApi";
import ZoneApi from "../../lib/apis/ZoneApi";
import HandleResponseApi from "../../lib/HandleResponse";

// Study data
// const studies = [
//   { id: 1, title: "Study 1", tags: ["health", "nutrition"], zone: "North" },
//   { id: 2, title: "Study 2", tags: ["fitness", "wellness"], zone: "South" },
//   { id: 3, title: "Study 3", tags: ["nutrition", "wellness"], zone: "East" },
//   { id: 4, title: "Study 4", tags: ["health", "fitness"], zone: "West" },
//   { id: 5, title: "Study 5", tags: ["science", "research"], zone: "North" },
//   { id: 6, title: "Study 6", tags: ["technology", "innovation"], zone: "East" },
//   { id: 7, title: "Study 7", tags: ["health", "technology"], zone: "South" },
//   { id: 8, title: "Study 8", tags: ["nutrition", "research"], zone: "West" },
//   { id: 9, title: "Study 9", tags: ["wellness", "science"], zone: "North" },
//   { id: 10, title: "Study 10", tags: ["fitness", "nutrition"], zone: "South" },
// ];

const ITEMS_PER_PAGE = 2; // Number of items per page

const JoinStudy_Main = () => {
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedZone, setSelectedZone] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const totalPages = Math.ceil(filteredStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudies = filteredStudies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  console.log(
    "totalPages, startIndex, paginatedStudies ",
    totalPages,
    startIndex,
    paginatedStudies
  );

  // Handlers
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
    const getFetchStudyByTagsAndZones = async (newTags, newZones) => {
      const response = await StudyApi.fetchStudyByTagsAndZones(
        newTags,
        newZones
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
    if (!newTags && !newZones) {
      console.log("get whole studies");
    } else {
      getFetchStudyByTagsAndZones(newTags, newZones);
    }
  }, [selectedTag, selectedZone]);

  useEffect(() => {
    const getAllZones = async () => {
      const response = await ZoneApi.getAllZones();
      console.log("response => ", response);
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
          ))
        ) : (
          <p>No studies found for the selected filters.</p>
        )}

        {/* Pagination */}
        {filteredStudies.length > ITEMS_PER_PAGE && (
          <S.Pagination>
            <S.PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </S.PageButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <S.PageButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </S.PageButton>
          </S.Pagination>
        )}
      </S.StudyResultsContainer>
    </S.StudyListContainer>
  );
};

export default JoinStudy_Main;
