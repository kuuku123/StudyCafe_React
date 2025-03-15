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
import JoinStudy_Main from "../JoinStudyPage/JoinStudy_Main";
import PublishedStudyList from "./PublishedStudyList";
import { TagForm, ZoneForm } from "../../utils/type";
import StudyApi from "../../lib/apis/StudyApi";
import HandleResponseApi from "../../lib/HandleResponse";

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
          <Tag Icon={FaHeartbeat} label="Health" />
          <Tag Icon={FaLaptopCode} label="Computer Science" />
          <Tag Icon={FaCalculator} label="Mathematics" />
          <Tag Icon={FaAtom} label="Physics" />
          <Tag Icon={FaFlask} label="Biology" />
          <Tag Icon={FaBook} label="Chemistry" />
          <Tag Icon={FaHistory} label="Literature" />
          <Tag Icon={FaChartLine} label="History" />
          <Tag Icon={FaBrain} label="Economics" />
          <Tag Icon={FaCogs} label="Psychology" />
          <Tag Icon={FaLightbulb} label="Engineering" />
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
