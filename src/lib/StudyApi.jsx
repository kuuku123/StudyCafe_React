const fetchStudyList = async () => {
  const raw_studyList = await fetch(`${SERVER_API_URL}/study-list`, {
    credentials: "include",
    method: "GET",
  });
  const studyList = await raw_studyList.json();
  console.log(studyList);
  return studyList;
};

const createStudy = async (createStudyForm) => {
  const raw_response = await fetch(`${SERVER_API_URL}/new-study`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(createStudyForm),
  });
  const response = await raw_response.json();
  return response;
};

const fetchStudyMembers = async (path) => {
  const raw_studyMemberList = await fetch(
    `${SERVER_API_URL}/${path}/study-members`,
    {
      credentials: "include",
      method: "GET",
    }
  );
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

const publishStudy = async (path) => {
  const raw_published_study = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/publish`,
    {
      credentials: "include",
      method: "POST",
    }
  );
  console.log("raw_published_study => ", raw_published_study);
  const publicshed_study_json = await raw_published_study.json();
  return publicshed_study_json;
};

const StudyApi = {
  createStudy,
  fetchStudyList,
  fetchStudyMembers,
  fetchStudyImage,
  publishStudy,
};

export default StudyApi;
