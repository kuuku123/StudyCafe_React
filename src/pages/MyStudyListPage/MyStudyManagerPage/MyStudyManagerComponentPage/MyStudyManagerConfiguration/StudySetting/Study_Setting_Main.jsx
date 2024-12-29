import React from "react";
import * as S from "./Study_Setting_Main style";
import Button from "../../../../../../components/Button";

const Study_Setting_Main = () => {
  return (
    <S.Study_Setting_Container_style>
      <h2>Send Notification</h2>
      <S.Study_Setting_Paragraph_style>
        by clicking this button, we will send notification to account whoever
        interested in this study by tags and study
      </S.Study_Setting_Paragraph_style>
      <Button>Send Notification</Button>
      <h2>Delete Study</h2>
      <S.Study_Setting_Paragraph_style>
        by clicking this button study will be deleted
      </S.Study_Setting_Paragraph_style>
      <Button>Delete Study</Button>
    </S.Study_Setting_Container_style>
  );
};

export default Study_Setting_Main;
