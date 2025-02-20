import React, { createContext, useContext, useEffect, useState } from "react";
import Page from "../../../components/Page";
import Title from "../../../components/Title";
import * as S from "./My_Study_Member_Main_style";
import CopyRight from "../../../components/CopyRight";
import My_Study_Member_Main from "./My_Study_Member_Main";
import { useLocation, useNavigate } from "react-router-dom";
import RoutesEnum from "../../../lib/RoutesEnum";
import StudyApi from "../../../lib/apis/StudyApi";
import HandleResponseApi from "../../../lib/HandleResponse";

const StudyMemberPage = () => {
  const [study, setStudy] = useState();

  const handleResponse = HandleResponseApi.useHandleResponse();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const navigate = useNavigate();

  useEffect(() => {
    const getStudy = async (path: string) => {
      const response = await StudyApi.fetchStudy(path);
      handleResponse(response, setStudy, { path: "", dialog: "" });
    };
    getStudy(path);
  }, [path]);

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
        {study && <My_Study_Member_Main study={study}></My_Study_Member_Main>}
      </Page>
    </div>
  );
};

export default StudyMemberPage;
