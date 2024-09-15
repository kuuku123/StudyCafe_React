import React, { useState } from "react";
import * as S from "./Member_Main_style";
import { useStudy } from "../..";

const Study_Member_Main = () => {
  const [img, setImage] = useState();
  const study = useStudy();
  return (
    <>
      <S.Study_Manager_Picture_style>
        <img
          src={img}
          width="240x"
          height="240px"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        ></img>
        <figcaption style={{ textAlign: "center" }}>Study Manager</figcaption>
      </S.Study_Manager_Picture_style>
      <S.Study_Members_style>
        Members
      </S.Study_Members_style>
    </>
  );
};

export default Study_Member_Main;
