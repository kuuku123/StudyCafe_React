import React, { useEffect, useRef, useState } from "react";
import * as S from "./Homepage_Main_style";
import {
  FaHeartbeat,
  FaLaptopCode,
  FaCalculator,
  FaAtom,
  FaFlask,
  FaBook,
  FaHistory,
  FaChartLine,
  FaBrain,
  FaCogs,
  FaLightbulb,
} from "react-icons/fa";
import Tag from "./Tag";
import PublishedStudyList from "./PublishedStudyList";
import { TagForm, ZoneForm } from "../../utils/type";
import StudyApi from "../../lib/apis/StudyApi";
import HandleResponseApi from "../../lib/HandleResponse";
import TagsEnum from "../../lib/TagsEnum";

const Hompage_Main = () => {
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [totalStudies, setTotalStudies] = useState<number>(0);
  const [currentTag, setCurrentTag] = useState<TagForm>({ title: "All" });
  const [currentZone, setCurrentZone] = useState<ZoneForm>({
    city: "Andong",
    province: "Andong",
  });
  const handleResponse = HandleResponseApi.useHandleResponse();

  // Check scrollability on mount and when window resizes
  const checkForOverflow = () => {
    const el = tagsRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  // A dedicated handler for tag clicks
  const handleTagClick = (tagLabel: string) => {
    console.log("taglabel => ", tagLabel);
    setCurrentTag({ title: tagLabel });
  };

  useEffect(() => {
    checkForOverflow();
    window.addEventListener("resize", checkForOverflow);
    return () => window.removeEventListener("resize", checkForOverflow);
  }, []);

  useEffect(() => {
    const totalStudyCount = async () => {
      const response = await StudyApi.fetchTotalStudiesCount();
      handleResponse(response, setTotalStudies, { path: "", dialog: "" });
    };
    totalStudyCount();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = tagsRef.current;
    if (el) {
      const scrollAmount = 100; // adjust scroll distance as needed
      if (direction === "left") {
        el.scrollLeft -= scrollAmount;
      } else {
        el.scrollLeft += scrollAmount;
      }
      // Update button visibility after scroll
      setTimeout(checkForOverflow, 200);
    }
  };
  return (
    <>
      <S.Tags_wrapper>
        {canScrollLeft && (
          <S.ScrollButton style={{ left: 0 }} onClick={() => scroll("left")}>
            &#8592;
          </S.ScrollButton>
        )}
        {canScrollRight && (
          <S.ScrollButton style={{ right: 0 }} onClick={() => scroll("right")}>
            &#8594;
          </S.ScrollButton>
        )}

        <S.Tags_style ref={tagsRef}>
          <Tag
            Icon={FaAtom}
            label="All"
            onClick={() => handleTagClick(TagsEnum.All)}
          />
          <Tag
            Icon={FaHeartbeat}
            label="Health"
            onClick={() => handleTagClick(TagsEnum.Health)}
          />
          <Tag
            Icon={FaLaptopCode}
            label="Computer Science"
            onClick={() => handleTagClick(TagsEnum.ComputerScience)}
          />
          <Tag
            Icon={FaCalculator}
            label="Mathematics"
            onClick={() => handleTagClick(TagsEnum.Mathematics)}
          />
          <Tag
            Icon={FaAtom}
            label="Physics"
            onClick={() => handleTagClick(TagsEnum.Physics)}
          />
          <Tag
            Icon={FaFlask}
            label="Biology"
            onClick={() => handleTagClick(TagsEnum.Biology)}
          />
          <Tag
            Icon={FaBook}
            label="Chemistry"
            onClick={() => handleTagClick(TagsEnum.Chemistry)}
          />
          <Tag
            Icon={FaHistory}
            label="Literature"
            onClick={() => handleTagClick(TagsEnum.Literature)}
          />
          <Tag
            Icon={FaChartLine}
            label="History"
            onClick={() => handleTagClick(TagsEnum.History)}
          />
          <Tag
            Icon={FaBrain}
            label="Economics"
            onClick={() => handleTagClick(TagsEnum.Economics)}
          />
          <Tag
            Icon={FaCogs}
            label="Psychology"
            onClick={() => handleTagClick(TagsEnum.Psychology)}
          />
          <Tag
            Icon={FaLightbulb}
            label="Engineering"
            onClick={() => handleTagClick(TagsEnum.Engineering)}
          />
        </S.Tags_style>
      </S.Tags_wrapper>

      <S.Homeapge_Main_style>
        <S.Home_Title_style>Welcome To Study Cafe</S.Home_Title_style>
        <S.Home_Intro_style>
          Find and participate in studies based on tags and regions. <br />
        </S.Home_Intro_style>
        <S.Home_Intro_style>
          Provides study meeting management.
        </S.Home_Intro_style>
        <PublishedStudyList
          tag={currentTag}
          zone={currentZone}
          totalStudies={totalStudies}
          pageSize={5}
        ></PublishedStudyList>
      </S.Homeapge_Main_style>
    </>
  );
};

export default Hompage_Main;
