import React, { useEffect, useState } from "react";
import * as S from "./ProfileTagsAndZones_Main_style";
import HandleResponseApi from "../../../../lib/HandleResponse";
import Select from "react-select";
import TagApi from "../../../../lib/apis/TagApi";
import ZoneApi from "../../../../lib/apis/ZoneApi";
import Button from "../../../../components/Button";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Dialog from "../../../../components/Dialog";
import * as MyLayout from "../../../../lib/MyLayout";

const ProfileTagsAndZones_Main = ({ setCategory }) => {
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
  const { startLoading, finishLoading } = MyLayout.useLoading();

  const handleTagChange = (selectedOption) => {
    setWillSelectedTags(selectedOption);
    setSelectedTags((prevTags) => {
      console.log("prevTags => ", prevTags);
      const newTags = TagApi.changeTagLabelToTitile(selectedOption);

      console.log("newTags => ", newTags);
      // Combine the previous tags and the new tags
      const updatedTags = [
        ...(prevTags || []),
        ...newTags.filter(
          (newTag) =>
            !(prevTags || []).some((prevTag) => prevTag.title === newTag.title)
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
        ...(prevZones || []), // Use an empty array if prevZones is null or undefined
        ...newZones.filter(
          (newZone) =>
            !(prevZones || []).some(
              (prevZone) => prevZone.city === newZone.city
            )
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

  const getTags = async () => {
    const response = await TagApi.getAccountTags();
    console.log("getTags => ", response);
    handleResponse(response, handleInitTags, false);
  };
  const getZones = async () => {
    const response = await ZoneApi.getAccountZones();
    console.log("getZones => ", response);
    handleResponse(response, handleInitZones, false);
  };

  const reset = () => {
    getTags();
    getZones();
    setWillSelectedTags(null);
    setWillSelectedZones(null);
  };

  const handleWillSelectedTagAndZones = async () => {
    startLoading("configuring...");
    const newTags = TagApi.changeTagLabelToTitile(willSelectedTags);
    const newZones = ZoneApi.changeZoneLabelToCity(willSelectedZones);
    await TagApi.addAccountTag(newTags);
    await ZoneApi.addAccountZone(newZones);
    reset();
    finishLoading();
  };

  const handleClick = () => {
    console.log("selectedTag => ", willSelectedTags);
    console.log("selectedZones => ", willSelectedZones);
    handleWillSelectedTagAndZones();
  };

  const handleDeleteTag = async (tag) => {
    await TagApi.removeAccountTag({ title: tag });
    reset();
  };

  const handleDeleteZone = async (city, province) => {
    await ZoneApi.removeAccountZone({
      city: city,
      province: province,
    });
    reset();
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

  // remove already choosen tags and zones
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

    getTags();
    getZones();
    getAllZones();
  }, []);
  return (
    <>
      <S.Profile_Select_Container_style>
        <S.Profile_Select_style>
          {/* Searchable Tag Dropdown */}
          <Select
            value={willSelectedTags}
            onChange={handleTagChange}
            options={uniqueTags}
            isClearable
            isMulti
            placeholder="Search and select tag..."
          />
        </S.Profile_Select_style>
        <S.Profile_Select_style>
          {/* Searchable Zone Dropdown */}
          <Select
            value={willSelectedZones}
            onChange={handleZoneChange}
            options={uniqueZones}
            isClearable
            isMulti
            placeholder="Search and select zone..."
          />
        </S.Profile_Select_style>
        <Button size="medium" width="50%" type="submit" onClick={handleClick}>
          save
        </Button>
      </S.Profile_Select_Container_style>
      <S.Profile_Configuration_Description_style>
        <h2>Choose tags and Zone and save</h2>
        <h3>this study will have Tags and Zone you have chosen</h3>
        <S.Selected_Items_Container_style>
          <S.Selected_Tags_Container_style>
            <h4>Selected Tags:</h4>
            {selectedTags && selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <>
                  <S.Tag_Pill_style
                    data-tooltip-id="customTooltipTag"
                    key={tag.id}
                    onClick={() => handleDeleteTag(tag.title)}
                  >
                    {tag.title}
                  </S.Tag_Pill_style>
                  <ReactTooltip
                    id="customTooltipTag"
                    effect="solid"
                    place="top"
                  >
                    click to delete tag
                  </ReactTooltip>
                </>
              ))
            ) : (
              <p>No tags selected</p>
            )}
          </S.Selected_Tags_Container_style>

          <S.Selected_Zones_Container_style>
            <h4>Selected Zones:</h4>
            {selectedZones && selectedZones.length > 0 ? (
              selectedZones.map((zone) => (
                <>
                  <S.Zone_Pill_style
                    key={zone.id}
                    data-tooltip-id="customTooltipZone"
                    onClick={() => handleDeleteZone(zone.city, zone.province)}
                  >
                    `{zone.city} [{zone.province}]`
                  </S.Zone_Pill_style>
                  <ReactTooltip
                    id="customTooltipZone"
                    effect="solid"
                    place="top"
                  >
                    click to delete zone
                  </ReactTooltip>
                </>
              ))
            ) : (
              <p>No zones selected</p>
            )}
          </S.Selected_Zones_Container_style>
        </S.Selected_Items_Container_style>
      </S.Profile_Configuration_Description_style>
    </>
  );
};

export default ProfileTagsAndZones_Main;
