const fetchStudyList = async () => {
  const raw_studyList = await fetch(`${SERVER_API_URL}/member/study-list`, {
    credentials: "include",
    method: "GET",
  });
  const studyList = await raw_studyList.json();
  console.log(studyList);
  return studyList;
};

const fetchStudyMembers = async (path) => {
  const raw_studyMemberList = await fetch(
    `${SERVER_API_URL}/member/${path}/study-members`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyMemberList = await raw_studyMemberList.json();
  console.log(studyMemberList);
  return studyMemberList;
};

const fetchStudyManagers = async (path) => {
  const raw_studyManagerList = await fetch(
    `${SERVER_API_URL}/member/${path}/study-managers`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyManagerList = await raw_studyManagerList.json();
  console.log(studyManagerList);
  return studyManagerList;
};

const StudyMemberApi = {
  fetchStudyList,
  fetchStudyManagers,
  fetchStudyMembers,
};

export default StudyMemberApi;
