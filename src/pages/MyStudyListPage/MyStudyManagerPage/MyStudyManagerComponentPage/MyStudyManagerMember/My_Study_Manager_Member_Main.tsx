import React, { useEffect, useState } from "react";
import * as S from "./My_Study_Manager_Member_Main_style";
import HandleResponseApi from "../../../../../lib/HandleResponse";
import StudyManagerApi from "../../../../../lib/apis/StudyManagerApi";
import { AccountDto, StudyDto } from "../../../../../utils/type";
import { HiUser, HiUserGroup } from "react-icons/hi";

const My_Study_Mananger_Member_Main: React.FC<{ study: StudyDto }> = ({
  study,
}) => {
  const [img, setImage] = useState<string>();
  const [studyMembers, setStudyMembers] = useState<AccountDto[]>([]);

  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleStudyMembers = (studyMembers: AccountDto[]) => {
    setStudyMembers(studyMembers);
  };

  const handleImage = (profile_image_base64_encoded: string) => {
    if (!profile_image_base64_encoded) return;
    const base64Image = "data:image/png;base64," + profile_image_base64_encoded;
    setImage(base64Image);
  };

  useEffect(() => {
    const getStudyMembers = async (path: string) => {
      const response = await StudyManagerApi.fetchStudyMembers(path);
      handleResponse(response, handleStudyMembers, { path: "", dialog: "" });
    };

    const getStudyManager = async () => {
      const study_manager = await StudyManagerApi.fetchStudyManagers(
        study.path
      );
      if (study_manager.data && study_manager.data[0]) {
        handleImage(study_manager.data[0].profileImage);
      }
    };

    getStudyMembers(study.path);
    getStudyManager();
  }, [study.path]);

  return (
    <S.MemberContainer>
      <S.Section>
        <h2><HiUser /> Study Manager</h2>
        <S.MemberItem>
          <img
            src={img}
            alt="Manager"
            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>Manager</div>
        </S.MemberItem>
      </S.Section>

      <S.Section>
        <h2><HiUserGroup /> Study Members</h2>
        <S.List>
          {Array.isArray(studyMembers) && studyMembers.length > 0 ? (
            studyMembers.map((member, index) => (
              <S.MemberItem key={index}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: '#f1f5f9', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  color: '#64748b'
                }}>
                  <HiUser size={20} />
                </div>
                <div style={{ fontWeight: 500 }}>{member.nickname}</div>
              </S.MemberItem>
            ))
          ) : (
            <div style={{ color: '#94a3b8', padding: '1rem' }}>No members yet</div>
          )}
        </S.List>
      </S.Section>
    </S.MemberContainer>
  );
};

export default My_Study_Mananger_Member_Main;
