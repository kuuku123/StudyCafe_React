import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./My_Study_Configuration_Main_style";
import ZoneApi from "../../../../../lib/apis/ZoneApi";
import HandleResponseApi from "../../../../../lib/HandleResponse";
import Button from "../../../../../components/Button";
import { useStudy } from "../..";
import TagApi from "../../../../../lib/apis/TagApi";

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

const My_Study_Configuration_Main = () => {
  const [willSelectedTag, setWillSelectedTag] = useState(null);
  const [willSelectedZone, setWillSelectedZone] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [uniqueZones, setUniqueZones] = useState([]);
  const handleResponse = HandleResponseApi.useHandleResponse();

  const study = useStudy();

  const handleTagChange = (selectedOption) => {
    setWillSelectedTag(selectedOption);
  };
  const handleZoneChange = (selectedOption) => {
    setWillSelectedZone(selectedOption);
  };

  const handleWillSelectedTag = async () => {
    const response = await TagApi.addTag(study.path, willSelectedTag);
    handleResponse(response, null, false);
  };
  const handleWillSelectedZone = async () => {
    const response = await ZoneApi.addZone(study.path, willSelectedZone);
    handleResponse(response, null, false);
  };

  const setSelectedTags = async (tags) => {
    console.log("tags => ",tags)
    setSelectedTag(tags)
  }

  const setSelectedZones = async (zones) => {
    console.log("zones => ",zones)
    setSelectedZone(zones)
  }

  const handleClick = () => {
    console.log("selectedTag => ", willSelectedTag);
    console.log("selectedZones => ", willSelectedZone);
    handleWillSelectedTag();
    handleWillSelectedZone();
  };

  const parseZones = (zones) => {
    const mappedCities = zones.map((cityObj) => ({
      value: { city: cityObj.city, province: cityObj.province },
      label: cityObj.city,
    }));
    setUniqueZones(mappedCities);
  };


  useEffect(() => {
    const getAllZones = async () => {
      const response = await ZoneApi.getAllZones();
      console.log("response => ", response);
      handleResponse(response, parseZones, false);
    };

    const getTags = async() => {
      const response = await TagApi.getTags(study.path)
      console.log("getTags => ", response);
      handleResponse(response,setSelectedTags,false)
    }
    const getZones = async() => {
      const response = await ZoneApi.getZones(study.path)
      console.log("getZones => ", response);
      handleResponse(response,setSelectedZones,false)
    }
    getTags();
    getZones();
    getAllZones();

  }, []);

  return (
    <>
      <S.Study_Select_Container_style>
        <S.Study_Select_style>
          {/* Searchable Tag Dropdown */}
          <Select
            value={willSelectedTag}
            onChange={handleTagChange}
            options={uniqueTags}
            isClearable
            isMulti
            placeholder="Search and select tag..."
          />
        </S.Study_Select_style>
        <S.Study_Select_style>
          {/* Searchable Zone Dropdown */}
          <Select
            value={willSelectedZone}
            onChange={handleZoneChange}
            options={uniqueZones}
            isClearable
            isMulti
            placeholder="Search and select zone..."
          />
        </S.Study_Select_style>
        <Button size="medium" width="50%" type="submit" onClick={handleClick}>
          save
        </Button>
      </S.Study_Select_Container_style>
      <S.Study_Configuration_Description_style>
        <h2>Choose tags and Zone and save</h2>
        <h3>this study will have Tags and Zone you have chosen</h3>
        <S.Selected_Items_Container_style>
          <S.Selected_Tags_Container_style>
            <h4>Selected Tags:</h4>
            {selectedTag && selectedTag.length > 0 ? (
              selectedTag.map((tag) => (
                <S.Tag_Pill_style key={tag.id}>{tag.title}</S.Tag_Pill_style>
              ))
            ) : (
              <p>No tags selected</p>
            )}
          </S.Selected_Tags_Container_style>

          <S.Selected_Zones_Container_style>
            <h4>Selected Zones:</h4>
            {selectedZone && selectedZone.length > 0 ? (
              selectedZone.map((zone) => (
                <S.Zone_Pill_style key={zone.id}>
                  `{zone.city} [{zone.localNameOfCity}]`
                </S.Zone_Pill_style>
              ))
            ) : (
              <p>No zones selected</p>
            )}
          </S.Selected_Zones_Container_style>
        </S.Selected_Items_Container_style>
      </S.Study_Configuration_Description_style>
    </>
  );
};

export default My_Study_Configuration_Main;
