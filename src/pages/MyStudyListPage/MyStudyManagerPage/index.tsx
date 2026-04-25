import React, { useEffect, useState } from "react";
import Page from "../../../components/Page";
import Title from "../../../components/Title";
import * as S from "./My_Study_Manager_Main_style";
import CopyRight from "../../../components/CopyRight";
import My_Study_Manager_Main from "./My_Study_Manager_Main";
import { useLocation, useNavigate } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import { StudyDto } from "../../../utils/type";

const StudyManagerPage = () => {
  const [study, setStudy] = useState<StudyDto>();

  const handleResponse = HandleResponseApi.useHandleResponse();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refresh = queryParams.get("refresh");
    
    const getStudy = async (path: string) => {
      const response = await StudyApi.fetchStudy(path);
      
      // If the study doesn't exist or there's an error, redirect home or to an error page
      if (response.status !== "OK") {
        navigate(RoutesEnum.HOME, { replace: true });
        return; // Don't call handleResponse so we avoid the weird popup
      }

      handleResponse(response, setStudy, {path:"", dialog:""});
    };
    getStudy(path);

    if (refresh) {
      queryParams.delete("refresh");
      const newSearch = queryParams.toString();
      const newUrl = location.pathname + (newSearch ? `?${newSearch}` : "");
      navigate(newUrl, { replace: true });
    }
  }, [location.search]);

  if (!study && path) {
     // Wait for study to load or handle error
  }

  return (
    <Page
      header={
        <Title>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Study Management</span>
        </Title>
      }
      footer={<CopyRight />}
    >
      {study ? (
        <My_Study_Manager_Main study={study} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          Loading study details...
        </div>
      )}
    </Page>
  );
};

export default StudyManagerPage;
