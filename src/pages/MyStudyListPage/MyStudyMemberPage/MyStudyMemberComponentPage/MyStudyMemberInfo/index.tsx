import React from "react";
import My_Study_Member_Info_Main from "./My_Study_Member_Info_Main";
import { StudyDto } from "../../../../../utils/type";

const My_Study_Member_Info: React.FC<{ study: StudyDto }> = ({ study }) => {
  return <My_Study_Member_Info_Main study={study}></My_Study_Member_Info_Main>;
};

export default My_Study_Member_Info;
