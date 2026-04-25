import React from "react";
import * as S from "./Study_Setting_Main style";
import Button from "../../../../../../components/Button";

const Study_Setting_Main = () => {
  return (
    <S.Study_Setting_Container_style>
      <S.SettingSection>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Send Notifications</h2>
        <S.Study_Setting_Paragraph_style>
          Notify users who are interested in this study based on their tags and location.
        </S.Study_Setting_Paragraph_style>
        <Button width="fit-content">Send Notification</Button>
      </S.SettingSection>

      <S.SettingSection style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#ef4444' }}>Danger Zone</h2>
        <S.Study_Setting_Paragraph_style>
          Permanently delete this study. This action cannot be undone.
        </S.Study_Setting_Paragraph_style>
        <Button width="fit-content" style={{ backgroundColor: '#ef4444' }}>Delete Study</Button>
      </S.SettingSection>
    </S.Study_Setting_Container_style>
  );
};

export default Study_Setting_Main;
