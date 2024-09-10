import React, { useState, useEffect } from "react";
import StudyApi from "../../lib/StudyApi";
import HandleResponseApi from "../../lib/HandleResponse";

const StudyList_Main = () => {
  const [studies, setStudies] = useState([]);
  const handleResponse = HandleResponseApi.useHandleResponse();

  useEffect(() => {
    const getStudyList = async () => {
      const response = await StudyApi.fetchStudyList();

      handleResponse(response, setStudies, false);
    };
    getStudyList();
  }, []);

  return (
    <>
      <h2>Study List</h2>
      <ul>
        {/* Check if studies is an array and has items */}
        {Array.isArray(studies) && studies.length > 0 ? (
          studies.map((study, index) => (
            <li key={index}>
              <h3>{study.title}</h3>
              <p>Path: {study.path}</p>
              <p>Short Description: {study.shortDescription}</p>
              <details>
                <summary>Full Description</summary>
                <p>{study.fullDescription}</p>
              </details>
            </li>
          ))
        ) : (
          <li>No studies available</li> // Fallback message when studies is empty or not yet filled
        )}
      </ul>
    </>
  );
};

export default StudyList_Main;
