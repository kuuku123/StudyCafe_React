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

const Hompage_Main = () => {
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
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
      </S.Homeapge_Main_style>
    </>
  );
};

export default Hompage_Main;
