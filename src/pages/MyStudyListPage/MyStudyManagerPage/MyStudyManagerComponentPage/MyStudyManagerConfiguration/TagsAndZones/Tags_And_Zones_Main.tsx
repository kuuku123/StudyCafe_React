import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./Tags_And_Zones_Main_style";
import HandleResponseApi from "../../../../../../lib/HandleResponse";
import ZoneApi from "../../../../../../lib/apis/ZoneApi";
import TagApi from "../../../../../../lib/apis/TagApi";
import Button from "../../../../../../components/Button";
import { Tooltip as ReactTooltip } from "react-tooltip";
import * as MyLayout from "../../../../../../lib/MyLayout";
import {
  StudyDto,
  TagDto,
  TagType,
  ZoneDto,
  ZoneType,
} from "../../../../../../utils/type";

const Tags_And_Zones_Main: React.FC<{ study: StudyDto }> = ({ study }) => {
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
  const [willSelectedTags, setWillSelectedTags] = useState<TagType[] | null>(
    null
  );
  const [willSelectedZones, setWillSelectedZones] = useState<ZoneType[] | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);
  const [selectedZones, setSelectedZones] = useState<ZoneDto[]>([]);
  const [defaultTags, setDefaultTags] = useState<TagDto[]>([]);
  const [defaultZones, setDefaultZones] = useState<ZoneDto[]>([]);
  const [uniqueZones, setUniqueZones] = useState<ZoneType[]>([]);

  const handleResponse = HandleResponseApi.useHandleResponse();
  const { startLoading, finishLoading } = MyLayout.useLoading();

  const handleTagChange = (selectedOption: TagType[] | null) => {
    if (!selectedOption) {
      setWillSelectedTags(null);
      setSelectedTags([]);
      return;
    }

    setWillSelectedTags(selectedOption);
    setSelectedTags((prevTags) => {
      console.log("prevTags => ", prevTags);
      const newTags = TagApi.changeTagLabelToTitile(selectedOption);

      // Combine the previous tags and the new tags
      const updatedTags: TagDto[] = [
        ...prevTags,
        ...newTags.filter(
          (newTag: TagDto) =>
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
  const handleZoneChange = (selectedOption: ZoneType[]) => {
    setWillSelectedZones(selectedOption);
    setSelectedZones((prevZones) => {
      const newZones = ZoneApi.changeZoneLabelToCity(selectedOption);

      console.log("selected Options => ", selectedOption);
      const updatedZones = [
        ...prevZones,
        ...newZones.filter(
          (newZone: ZoneDto) =>
            !prevZones.some((prevZone) => prevZone.city === newZone.city)
        ),
      ];

      console.log(updatedZones);
      // remove Zones that currently doesn't exist in selectedOption
      const removedZones = updatedZones.filter((zone) =>
        selectedOption.some(
          (option: ZoneType) => option.value.city === zone.city
        )
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
    const response = await TagApi.getStudyTags(study.path);
    console.log("getTags => ", response);
    handleResponse(response, handleInitTags, { path: "", dialog: "" });
  };
  const getZones = async () => {
    const response = await ZoneApi.getStudyZones(study.path);
    console.log("getZones => ", response);
    handleResponse(response, handleInitZones, { path: "", dialog: "" });
  };

  const reset = () => {
    getTags();
    getZones();
    setWillSelectedTags(null);
    setWillSelectedZones(null);
  };

  const handleWillSelectedTagAndZones = async () => {
    startLoading("configuring....");
    const newTags = TagApi.changeTagLabelToTitile(willSelectedTags);
    const newZones = ZoneApi.changeZoneLabelToCity(willSelectedZones);
    await TagApi.addStudyTag(study.path, newTags);
    await ZoneApi.addStudyZone(study.path, newZones);
    reset();
    finishLoading();
  };

  const handleClick = () => {
    console.log("selectedTag => ", willSelectedTags);
    console.log("selectedZones => ", willSelectedZones);
    handleWillSelectedTagAndZones();
  };

  const handleDeleteTag = async (tag: string) => {
    await TagApi.removeStudyTag(study.path, { title: tag });
    reset();
  };

  const handleDeleteZone = async (city: string, province: string) => {
    await ZoneApi.removeStudyZone(study.path, {
      city: city,
      province: province,
    });
    reset();
  };

  const parseZones = (zones: ZoneDto[]) => {
    const mappedCities = zones.map((cityObj) => ({
      value: { city: cityObj.city, province: cityObj.province },
      label: cityObj.city,
    }));
    setUniqueZones(mappedCities);
  };

  const handleInitTags = (tags: TagDto[]) => {
    setSelectedTags(tags);
    setDefaultTags(tags);
  };
  const handleInitZones = (zones: ZoneDto[]) => {
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
      handleResponse(response, parseZones, { path: "", dialog: "" });
    };

    getTags();
    getZones();
    getAllZones();
  }, []);
  return (
    <S.Container>
      <S.Section>
        <h3>Configure Discovery</h3>
        <p style={{ color: '#64748b', marginBottom: '1rem' }}>Select tags and zones to help people find your study.</p>
        
        <S.SelectionArea>
          <S.Section>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Tags</h4>
            <Select
              value={willSelectedTags}
              onChange={handleTagChange}
              options={uniqueTags}
              isClearable
              isMulti
              placeholder="Search tags..."
              styles={{
                control: (base: any) => ({
                  ...base,
                  borderRadius: '0.5rem',
                  borderColor: '#e2e8f0',
                })
              }}
            />
          </S.Section>
          
          <S.Section>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Zones</h4>
            <Select
              value={willSelectedZones}
              onChange={handleZoneChange}
              options={uniqueZones}
              isClearable
              isMulti
              placeholder="Search zones..."
              styles={{
                control: (base: any) => ({
                  ...base,
                  borderRadius: '0.5rem',
                  borderColor: '#e2e8f0',
                })
              }}
            />
          </S.Section>
        </S.SelectionArea>
        
        <Button size="medium" width="200px" type="submit" onClick={handleClick} style={{ marginTop: '1rem' }}>
          Save Configuration
        </Button>
      </S.Section>

      <S.SelectionArea>
        <S.Section>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Active Tags</h4>
          <S.PillsContainer>
            {selectedTags && selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <React.Fragment key={tag.id}>
                  <S.Tag_Pill_style
                    data-tooltip-id={`tooltip-tag-${tag.id}`}
                    onClick={() => handleDeleteTag(tag.title)}
                  >
                    {tag.title}
                  </S.Tag_Pill_style>
                  <ReactTooltip
                    id={`tooltip-tag-${tag.id}`}
                    variant="info"
                    place="top"
                    content="Click to remove"
                  />
                </React.Fragment>
              ))
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No tags selected</p>
            )}
          </S.PillsContainer>
        </S.Section>

        <S.Section>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Active Zones</h4>
          <S.PillsContainer>
            {selectedZones && selectedZones.length > 0 ? (
              selectedZones.map((zone) => (
                <React.Fragment key={zone.id}>
                  <S.Zone_Pill_style
                    data-tooltip-id={`tooltip-zone-${zone.id}`}
                    onClick={() => handleDeleteZone(zone.city, zone.province)}
                  >
                    {zone.city} ({zone.province})
                  </S.Zone_Pill_style>
                  <ReactTooltip
                    id={`tooltip-zone-${zone.id}`}
                    variant="info"
                    place="top"
                    content="Click to remove"
                  />
                </React.Fragment>
              ))
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No zones selected</p>
            )}
          </S.PillsContainer>
        </S.Section>
      </S.SelectionArea>
    </S.Container>
  );
};

export default Tags_And_Zones_Main;
