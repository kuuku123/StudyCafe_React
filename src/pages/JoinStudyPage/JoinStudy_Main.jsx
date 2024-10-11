import React, { useState } from "react";
import Select from "react-select";
import * as S from "./JoinStudy_Main_style";
import { GiConsoleController } from "react-icons/gi";

// Study data
const studies = [
  { id: 1, title: "Study 1", tags: ["health", "nutrition"], zone: "North" },
  { id: 2, title: "Study 2", tags: ["fitness", "wellness"], zone: "South" },
  { id: 3, title: "Study 3", tags: ["nutrition", "wellness"], zone: "East" },
  { id: 4, title: "Study 4", tags: ["health", "fitness"], zone: "West" },
  { id: 5, title: "Study 5", tags: ["science", "research"], zone: "North" },
  { id: 6, title: "Study 6", tags: ["technology", "innovation"], zone: "East" },
  { id: 7, title: "Study 7", tags: ["health", "technology"], zone: "South" },
  { id: 8, title: "Study 8", tags: ["nutrition", "research"], zone: "West" },
  { id: 9, title: "Study 9", tags: ["wellness", "science"], zone: "North" },
  { id: 10, title: "Study 10", tags: ["fitness", "nutrition"], zone: "South" },
];

const ITEMS_PER_PAGE = 1; // Number of items per page

// Extract unique tags and zones for dropdowns
const uniqueTags = [...new Set(studies.flatMap((study) => study.tags))].map(
  (tag) => ({ value: tag, label: tag })
);
const uniqueZones = [...new Set(studies.map((study) => study.zone))].map(
  (zone) => ({ value: zone, label: zone })
);

const JoinStudy_Main = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter studies based on selected tag and zone
  const filteredStudies = studies.filter((study) => {
    let matchesTag =
      selectedTag &&
      selectedTag.some((tag) => study.tags.includes(tag.value));

    let matchesZone =
      selectedZone &&
      selectedZone.some((zone) => study.zone.includes(zone.value));
    if (!selectedTag) {
      matchesTag = true
    }
    if (!selectedZone) {
      matchesZone = true
    }
    return matchesTag && matchesZone;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudies = filteredStudies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
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
              <p>Zone: {study.zone}</p>
              <S.Tags>
                {study.tags.map((tag) => (
                  <S.Tag key={tag}>{tag}</S.Tag>
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
