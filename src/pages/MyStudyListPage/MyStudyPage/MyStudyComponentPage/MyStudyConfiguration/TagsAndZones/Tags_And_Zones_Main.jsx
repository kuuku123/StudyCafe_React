import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./Tags_And_Zones_Main_style";
import HandleResponseApi from "../../../../../../lib/HandleResponse";
import ZoneApi from "../../../../../../lib/apis/ZoneApi";
import TagApi from "../../../../../../lib/apis/TagApi";
import Button from "../../../../../../components/Button";

const Tags_And_Zones_Main = ({ study }) => {
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
  const [willSelectedTags, setWillSelectedTags] = useState(null);
  const [willSelectedZones, setWillSelectedZones] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [selectedZones, setSelectedZones] = useState(null);
  const [defaultTags, setDefaultTags] = useState([]);
  const [defaultZones, setDefaultZones] = useState([]);
  const [uniqueZones, setUniqueZones] = useState([]);
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleTagChange = (selectedOption) => {
    setWillSelectedTags(selectedOption);
    setSelectedTags((prevTags) => {
      console.log("prevTags => ", prevTags);
      const newTags = TagApi.changeTagLabelToTitile(selectedOption);

      // Combine the previous tags and the new tags
      const updatedTags = [
        ...prevTags,
        ...newTags.filter(
          (newTag) =>
            !prevTags.some((prevTag) => prevTag.title === newTag.title)
        ),
      ];
      console.log("updatedTags => ", updatedTags);

      // remove tags that currently doesn't exist in selectedOption
      const removedTags = updatedTags.filter((tag) =>
        selectedOption.some((option) => option.value === tag.title)
      );

      console.log("removedTags => ", removedTags);
      const finalTags = [
        ...removedTags,
        ...defaultTags.filter(
          (defaultTag) =>
            !removedTags.some(
              (removeTag) => removeTag.title === defaultTag.title
            )
        ),
      ];
      return finalTags;
    });
  };
  const handleZoneChange = (selectedOption) => {
    setWillSelectedZones(selectedOption);
    setSelectedZones((prevZones) => {
      const newZones = ZoneApi.changeZoneLabelToCity(selectedOption);

      console.log("selected Options => ", selectedOption);
      const updatedZones = [
        ...prevZones,
        ...newZones.filter(
          (newZone) =>
            !prevZones.some((prevZone) => prevZone.city === newZone.city)
        ),
      ];

      console.log(updatedZones);
      // remove Zones that currently doesn't exist in selectedOption
      const removedZones = updatedZones.filter((zone) =>
        selectedOption.some((option) => option.value.city === zone.city)
      );

      console.log("removedZones => ", removedZones);
      console.log("defaultZone => ", defaultZones);
      const finalZones = [
        ...removedZones,
        ...defaultZones.filter(
          (defaultZone) =>
            !removedZones.some(
              (removeZone) => removeZone.city === defaultZone.city
            )
        ),
      ];

      return finalZones;
    });
  };

  const handleWillSelectedTagAndZones = async () => {
    const newTags = TagApi.changeTagLabelToTitile(willSelectedTags);
    const newZones = ZoneApi.changeZoneLabelToCity(willSelectedZones);
    const response1 = await TagApi.addTag(study.path, newTags);
    const response2 = await ZoneApi.addZone(study.path, newZones);
    handleResponse(response1, null, false);
    handleResponse(response2, null, {
      useNav: true,
      path: "" / study / " + study.path, { state: study }",
    });
  };

  const handleClick = () => {
    console.log("selectedTag => ", willSelectedTags);
    console.log("selectedZones => ", willSelectedZones);
    handleWillSelectedTagAndZones();
  };

  const parseZones = (zones) => {
    const mappedCities = zones.map((cityObj) => ({
      value: { city: cityObj.city, province: cityObj.province },
      label: cityObj.city,
    }));
    setUniqueZones(mappedCities);
  };

  const handleInitTags = (tags) => {
    setSelectedTags(tags);
    setDefaultTags(tags);
  };
  const handleInitZones = (zones) => {
    setSelectedZones(zones);
    setDefaultZones(zones);
  };

  useEffect(() => {
    if (defaultTags.length > 0) {
      const filteredTags = uniqueTags.filter(
        (tag) =>
          !defaultTags.some((defaultTag) => defaultTag.title === tag.value)
      );
      console.log("defaultTags => ", defaultTags);
      console.log("filteredTags => ", filteredTags);
      setUniqueTags(filteredTags);
    }
    if (defaultZones.length > 0) {
      const filteredZones = uniqueZones.filter(
        (zone) =>
          !defaultZones.some((defaultZone) => defaultZone.city === zone.label)
      );
      console.log("defaultZones => ", defaultZones);
      console.log("filteredZones => ", filteredZones);
      setUniqueZones(filteredZones);
    }
  }, [defaultTags, defaultZones]);

  useEffect(() => {
    const getAllZones = async () => {
      const response = await ZoneApi.getAllZones();
      console.log("response => ", response);
      handleResponse(response, parseZones, false);
    };

    const getTags = async () => {
      const response = await TagApi.getTags(study.path);
      console.log("getTags => ", response);
      handleResponse(response, handleInitTags, false);
    };
    const getZones = async () => {
      const response = await ZoneApi.getZones(study.path);
      console.log("getZones => ", response);
      handleResponse(response, handleInitZones, false);
    };
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
            value={willSelectedTags}
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
            value={willSelectedZones}
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
            {selectedTags && selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <S.Tag_Pill_style key={tag.id}>{tag.title}</S.Tag_Pill_style>
              ))
            ) : (
              <p>No tags selected</p>
            )}
          </S.Selected_Tags_Container_style>

          <S.Selected_Zones_Container_style>
            <h4>Selected Zones:</h4>
            {selectedZones && selectedZones.length > 0 ? (
              selectedZones.map((zone) => (
                <S.Zone_Pill_style key={zone.id}>
                  `{zone.city} [{zone.province}]`
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

export default Tags_And_Zones_Main;
