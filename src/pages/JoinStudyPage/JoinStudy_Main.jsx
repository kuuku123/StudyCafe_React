import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select"; // Import react-select

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

// Styling for layout
const StudyListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  min-height: 80vh;
  padding: 20px;
  gap: 20px;
`;

const FiltersContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StudyResultsContainer = styled.div`
  width: 70%;
`;

const StudyCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0 0 10px;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
`;

const Tag = styled.span`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 15px;
  font-size: 12px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;

  &:disabled {
    background-color: #ddd;
    color: #888;
    cursor: not-allowed;
  }
`;

const ITEMS_PER_PAGE = 3; // Number of items per page

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
    const matchesTag = !selectedTag || study.tags.includes(selectedTag.value);
    const matchesZone = !selectedZone || study.zone === selectedZone.value;
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
    <StudyListContainer>
      {/* Filters on the left */}
      <FiltersContainer>
        {/* Searchable Tag Dropdown */}
        <Select
          value={selectedTag}
          onChange={handleTagChange}
          options={uniqueTags}
          isClearable
          placeholder="Search and select tag..."
        />

        {/* Searchable Zone Dropdown */}
        <Select
          value={selectedZone}
          onChange={handleZoneChange}
          options={uniqueZones}
          isClearable
          placeholder="Search and select zone..."
        />
      </FiltersContainer>

      {/* Study list and pagination on the right */}
      <StudyResultsContainer>
        {/* Display Studies */}
        {paginatedStudies.length > 0 ? (
          paginatedStudies.map((study) => (
            <StudyCard key={study.id}>
              <Title>{study.title}</Title>
              <p>Zone: {study.zone}</p>
              <Tags>
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </StudyCard>
          ))
        ) : (
          <p>No studies found for the selected filters.</p>
        )}

        {/* Pagination */}
        {filteredStudies.length > ITEMS_PER_PAGE && (
          <Pagination>
            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </PageButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PageButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </PageButton>
          </Pagination>
        )}
      </StudyResultsContainer>
    </StudyListContainer>
  );
};

export default JoinStudy_Main;
