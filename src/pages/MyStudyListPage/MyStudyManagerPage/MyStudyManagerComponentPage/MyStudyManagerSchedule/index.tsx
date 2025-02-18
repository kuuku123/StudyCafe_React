import React from "react";
import My_Study_Manager_Schedule_Main from "./My_Study_Manager_Schedule_Main";
import { StudyDto } from "../../../../../utils/type";

const My_Study_Manager_Schedule: React.FC<{ study: StudyDto }> = ({
  study,
}) => {
  return (
    <My_Study_Manager_Schedule_Main
      study={study}
    ></My_Study_Manager_Schedule_Main>
  );
};

export default My_Study_Manager_Schedule;
