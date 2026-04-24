import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./JoinStudy_Main_style";
import StudyApi from "../../lib/apis/StudyApi";
import TagApi from "../../lib/apis/TagApi";
import ZoneApi from "../../lib/apis/ZoneApi";
import HandleResponseApi from "../../lib/HandleResponse";
import { Link } from "react-router-dom";
import RoutesEnum from "../../lib/RoutesEnum";
import {
  StudyDto,
  StudyJoinDto,
  TagDto,
  TagForm,
  TagType,
  ZoneDto,
  ZoneForm,
  ZoneType,
} from "../../utils/type";

const JoinStudy_Main = () => {
  const [selectedTags, setSelectedTags] = useState<TagType[] | null>([]);
  const [selectedZones, setSelectedZones] = useState<ZoneType[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const [studies, setStudies] = useState<StudyJoinDto[]>([]);
  const [uniqueZones, setUniqueZones] = useState<ZoneType[]>([]);
  const [uniqueTags, setUniqueTags] = useState<TagType[]>([
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
    console.log("selectedZones ", selectedZones);
    let matchesTag =
      selectedTags &&
      selectedTags.some((tag) =>
        study.tagDtoList.some((tagDto) => tagDto.title === tag.value)
      );
    let matchesZone =
      selectedZones &&
      selectedZones.some((zone) =>
        study.zoneDtoList.some((zoneDto) => zoneDto.city === zone.value.city)
      );

    if (selectedTags && selectedTags.length == 0) {
      matchesTag = true;
    }
    if (selectedZones && selectedZones.length == 0) {
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

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: Math.min(pagesToShow, totalPages - pageGroupStart + 1) },
    (_, i) => pageGroupStart + i
  );

  // Handlers
  const handleTagChange = (selectedOption: TagType[] | null) => {
    setSelectedTags(selectedOption);
    setCurrentPage(1); // Reset to first page when tag changes
  };
  const handleZoneChange = (selectedOption: ZoneType[] | null) => {
    setSelectedZones(selectedOption);
    setCurrentPage(1); // Reset to first page when zone changes
  };

  const parseZones = (zones: ZoneDto[]) => {
    const mappedCities = zones.map((cityObj) => ({
      value: { city: cityObj.city, province: cityObj.province },
      label: cityObj.city,
    }));
    setUniqueZones(mappedCities);
  };
  useEffect(() => {
    console.log("useEffect");
    console.log("selectedTags => ", selectedTags);
    const getFetchStudyByTagsAndZones = async (
      newTags: TagForm[] | null,
      newZones: ZoneForm[] | null,
      page: number,
      size: number
    ) => {
      const response = await StudyApi.fetchStudyByTagsAndZones(
        newTags,
        newZones,
        page,
        size
      );
      console.log("fetchStudyBytagsAndZones => ", response);
      handleResponse(response, setStudies, { path: "", dialog: "" });
    };
    const newTags = selectedTags
      ? TagApi.changeTagLabelToTitile(selectedTags)
      : null;
    const newZones = selectedZones
      ? ZoneApi.changeZoneLabelToCity(selectedZones)
      : null;
    getFetchStudyByTagsAndZones(
      newTags,
      newZones,
      Math.ceil(pageGroupStart / pagesToShow),
      pagesToShow * ITEMS_PER_PAGE
    );
  }, [selectedTags, selectedZones, pageGroupStart]);

  useEffect(() => {
    const getAllZones = async () => {
      const response = await ZoneApi.getAllZones();
      handleResponse(response, parseZones, { path: "", dialog: "" });
    };
    getAllZones();
  }, []);

  // Custom styles for react-select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "10px",
      borderColor: state.isFocused ? "#6366f1" : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.1)" : "none",
      "&:hover": {
        borderColor: "#6366f1",
      },
      padding: "2px",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      borderRadius: "6px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#6366f1",
      fontWeight: "600",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#6366f1",
      "&:hover": {
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        color: "#4f46e5",
      },
    }),
  };

  return (
    <S.StudyListContainer>
      {/* Filters on the left */}
      <S.FiltersContainer>
        <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1e293b" }}>Filters</h3>
        {/* Searchable Tag Dropdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b" }}>Tags</label>
          <Select
            value={selectedTags}
            onChange={handleTagChange}
            options={uniqueTags}
            isClearable
            isMulti
            placeholder="Select tags..."
            styles={customStyles}
          />
        </div>

        {/* Searchable Zone Dropdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b" }}>Zones</label>
          <Select
            value={selectedZones}
            onChange={handleZoneChange}
            options={uniqueZones}
            isClearable
            isMulti
            placeholder="Select zones..."
            styles={customStyles}
          />
        </div>
      </S.FiltersContainer>

      {/* Study list and pagination on the right */}
      <S.StudyResultsContainer>
        {/* Display Studies */}
        {paginatedStudies.length > 0 ? (
          paginatedStudies.map((study) => (
            <Link to={RoutesEnum.STUDY_MEMBER(study.path)} key={study.id} style={{ textDecoration: "none" }}>
              <S.StudyCard>
                <S.Title>{study.title}</S.Title>
                <S.ShortDescription>{study.shortDescription}</S.ShortDescription>
                <S.Zones>
                  {study.zoneDtoList.map((zone) => (
                    <S.Zone key={zone.city}>{zone.city}</S.Zone>
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
          <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
            <p style={{ color: "#64748b", fontSize: "1.1rem" }}>No studies found for the selected filters.</p>
          </div>
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
