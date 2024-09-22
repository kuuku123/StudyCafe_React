const fetchStudyList = async () => {
  const raw_studyList = await fetch(`${SERVER_API_URL}/study-list`, {
    credentials: "include",
    method: "GET",
  });
  const studyList = await raw_studyList.json();
  console.log(studyList);
  return studyList;
};


const fetchStudyMembers = async (path) => {
  const raw_studyMemberList = await fetch(`${SERVER_API_URL}/${path}/study-members`, {
    credentials: "include",
    method: "GET",
  });
  const studyMemberList = await raw_studyMemberList.json();
  console.log(studyMemberList);
  return studyMemberList;
};

const fetchStudyImage = async (path) => {
  const raw_study_image = await fetch(
    `${SERVER_API_URL}/study/${path}/study-image`,
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
  fetchStudyMembers,
  fetchStudyImage,
};

export default StudyApi;
