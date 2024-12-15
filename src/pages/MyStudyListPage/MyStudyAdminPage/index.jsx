import React, { createContext, useContext, useEffect, useState } from "react";
import Page from "../../../components/Page";
import Title from "../../../components/Title";
import * as S from "./My_Study_Admin_Main_style";
import CopyRight from "../../../components/CopyRight";
import My_Study_Admin_Main from "./My_Study_Admin_Main";
import { useLocation, useNavigate } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";

const StudyAdminPage = () => {
  const [study, setStudy] = useState();

  const handleResponse = HandleResponseApi.useHandleResponse();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refresh = queryParams.get("refresh");
    // Your logic here (e.g., re-fetch data, etc.)
    const getStudy = async (path) => {
      const response = await StudyApi.fetchStudy(path);
      handleResponse(response, setStudy, false);
    };
    getStudy(path);

    if (refresh) {
      console.log("Refresh triggered:", refresh);

      // Remove the query parameter from the URL
      queryParams.delete("refresh");
      const newSearch = queryParams.toString();
      const newUrl = location.pathname + (newSearch ? `?${newSearch}` : "");

      // Use navigate to replace the URL without reloading
      navigate(newUrl, { replace: true });
    }
  }, [location.search]);

  if (!study) navigate(RoutesEnum.ERROR);

  return (
    <div>
      <Page
        header={
          <Title>
            <S.Header_Input_style></S.Header_Input_style>
          </Title>
        }
        footer={<CopyRight></CopyRight>}
      >
        {study && <My_Study_Admin_Main study={study}></My_Study_Admin_Main>}
      </Page>
    </div>
  );
};

export default StudyAdminPage;
