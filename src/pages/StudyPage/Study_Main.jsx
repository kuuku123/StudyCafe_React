import React from 'react'
import * as S from "./StudyPage_style";

const Study_Main = () => {
  return (
    <S.Grid_Container_style>
        <S.Study_Title_style>
          <span>Title</span>
          <span>Path</span>
        </S.Study_Title_style>
        <S.Study_Draft_style>
          <span>draft</span>
          <span>off</span>
        </S.Study_Draft_style>
        <S.Study_Link_style>
          <span>Info</span>
          <span>Member</span>
          <span>Schedule</span>
          <span>Configuration</span>
        </S.Study_Link_style>
        <S.Study_Link_Horizontal_Line_style></S.Study_Link_Horizontal_Line_style>

    </S.Grid_Container_style>
  )
}

export default Study_Main