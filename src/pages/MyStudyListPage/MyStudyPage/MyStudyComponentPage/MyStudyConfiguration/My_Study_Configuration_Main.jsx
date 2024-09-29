import React, { useState } from "react";
import Select from "react-select";
import * as S from "./My_Study_Configuration_Main_style";

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


  

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };
  const handleZoneChange = (selectedOption) => {
    setSelectedZone(selectedOption);
  };

  return (
    <S.Study_Configuration_Container_style>
      <S.Study_Select_style>
        {/* Searchable Tag Dropdown */}
        <Select
          value={selectedTag}
          onChange={handleTagChange}
          options={uniqueTags}
          isClearable
          placeholder="Search and select tag..."
        />
      </S.Study_Select_style>
      <S.Study_Select_style>
        {/* Searchable Zone Dropdown */}
        <Select
          
          value={selectedZone}
          onChange={handleZoneChange}
          options={uniqueZones}
          isClearable
          placeholder="Search and select zone..."
        />
      </S.Study_Select_style>
    </S.Study_Configuration_Container_style>
  );
};

export default JoinStudy_Main;
