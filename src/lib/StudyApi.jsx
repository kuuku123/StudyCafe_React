const fetchStudyList = async () => {
  const raw_studyList = await fetch(`http://localhost:8081/studyList`, {
    credentials: "include",
    method: "GET",
  });
  const studyList = await raw_studyList.json();
  console.log(studyList);
  return studyList;
};

const fetchStudyImage = async (path) => {
  const raw_study_image = await fetch(
    `http://localhost:8081/study/${path}/study-image`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  console.log("raw_study_image => ", raw_study_image);
  const study_image_json = await raw_study_image.json();
  return study_image_json;
};

const StudyApi = {
  fetchStudyList,
  fetchStudyImage,
};

export default StudyApi;
