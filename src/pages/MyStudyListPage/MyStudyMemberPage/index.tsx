import React, { useEffect, useState } from "react";
import Page from "../../../components/Page";
import Title from "../../../components/Title";
import * as S from "./My_Study_Member_Main_style";
import CopyRight from "../../../components/CopyRight";
import My_Study_Member_Main from "./My_Study_Member_Main";
import { useLocation, useNavigate } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import StudyManagerApi from "../../../lib/apis/StudyManagerApi";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../lib/features/redux/authSelector";
import { StudyDto } from "../../../utils/type";

const StudyMemberPage = () => {
  const [study, setStudy] = useState<StudyDto>();

  const handleResponse = HandleResponseApi.useHandleResponse();
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const { user, isAuthenticated } = useSelector(selectAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!path) return;

    const getStudy = async () => {
      const response = await StudyApi.fetchStudy(path);
      
      // If the study doesn't exist or there's an error, redirect home or to an error page
      if (response.status !== "OK") {
        navigate(RoutesEnum.HOME, { replace: true });
        return; // Don't call handleResponse so we avoid the weird popup
      }

      handleResponse(response, setStudy, { path: "", dialog: "" });
    };

    getStudy();
  }, [path]);

  useEffect(() => {
    if (isAuthenticated && user && path) {
      StudyManagerApi.isManager(path, user.email).then((response) => {
        if (response.data === true) {
          navigate(RoutesEnum.STUDY_MANAGER(path), { replace: true });
        }
      });
    }
  }, [path, isAuthenticated, user?.email, navigate]);

  if (!study && path) {
    // Loading state handled in return
  }

  return (
    <Page
      header={
        <Title>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Study Details</span>
        </Title>
      }
      footer={<CopyRight />}
    >
      {study ? (
        <My_Study_Member_Main study={study} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          Loading study details...
        </div>
      )}
    </Page>
  );
};

export default StudyMemberPage;
