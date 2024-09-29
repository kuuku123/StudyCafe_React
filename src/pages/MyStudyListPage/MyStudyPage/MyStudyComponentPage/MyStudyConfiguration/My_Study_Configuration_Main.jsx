import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./My_Study_Configuration_Main_style";
import ZoneApi from "../../../../../lib/apis/ZoneApi";
import HandleResponseApi from "../../../../../lib/HandleResponse";
import Button from "../../../../../components/Button";

const uniqueTags = [
  { value: "health", label: "health" },
  { value: "computer-science", label: "computer science" },
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
];

const JoinStudy_Main = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [uniqueZones, setUniqueZones] = useState([]);
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };
  const handleZoneChange = (selectedOption) => {
    setSelectedZone(selectedOption);
  };

  const parseZones = (zones) => {
    const mappedCities = zones.map((cityObj) => ({
      value: cityObj.city,
      label: cityObj.city,
    }));
    setUniqueZones(mappedCities);
  };

  useEffect(() => {
    const getZones = async () => {
      const response = await ZoneApi.getZones();
      console.log("response => ", response);
      handleResponse(response, parseZones, false);
    };
    getZones();
  }, []);

  const button_style = {

  }

  return (
    <>
      <S.Study_Select_Container_style>
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
        <Button size="medium" width="50%" type="submit">save</Button>
      </S.Study_Select_Container_style>
      <S.Study_Configuration_Description_style>
        <h2>Choose tags and Zone and save</h2>
        <h3>this study will have Tags and Zone you have chosen</h3>
      </S.Study_Configuration_Description_style>
    </>
  );
};

export default JoinStudy_Main;
