import React, { createContext, useContext, useEffect } from "react";
import Page from "../../../components/Page";
import Title from "../../../components/Title";
import * as S from "./My_Study_Main_style";
import CopyRight from "../../../components/CopyRight";
import Study_Main from "./My_Study_Main";
import { useLocation, useNavigate } from "react-router-dom";

const StudyContext = createContext();
export const useStudy = () => useContext(StudyContext);

const StudyPage = () => {
  const location = useLocation();
  const study = location.state;
  console.log("study => ", study);

  const navigate = useNavigate();

  useEffect(() => {
    if (!study) {
      console.log("it worked");
      navigate("/study");
    }
  }, []);

  if (!study) return null;

  return (
    <div>
      <Page
        header={
          <>
            <Title>
              <S.Header_Input_style></S.Header_Input_style>
            </Title>
          </>
        }
        footer={<CopyRight></CopyRight>}
      >
        <StudyContext.Provider value={study}>
          <Study_Main study={study}></Study_Main>
        </StudyContext.Provider>
      </Page>
    </div>
  );
};

export default StudyPage;
