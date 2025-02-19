import React from "react";
import My_Study_Configuration_Main from "./My_Study_Configuration_Main";
import { StudyDto } from "../../../../../utils/type";

const My_Study_Configuration: React.FC<{ study: StudyDto }> = ({ study }) => {
  return (
    <My_Study_Configuration_Main study={study}></My_Study_Configuration_Main>
  );
};

export default My_Study_Configuration;
