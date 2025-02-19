const fetchStudyList = async () => {
  const raw_studyList = await fetch(`${API_GATEWAY_URL}/app/manager/study-list`, {
    credentials: "include",
    method: "GET",
  });
  const studyList = await raw_studyList.json();
  console.log(studyList);
  return studyList;
};

const fetchStudyMembers = async (path: string) => {
  const raw_studyMemberList = await fetch(
    `${API_GATEWAY_URL}/app/manager/${path}/study-members`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyMemberList = await raw_studyMemberList.json();
  console.log(studyMemberList);
  return studyMemberList;
};

const fetchStudyManagers = async (path: string) => {
  const raw_studyManagerList = await fetch(
    `${API_GATEWAY_URL}/app/manager/${path}/study-managers`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyManagerList = await raw_studyManagerList.json();
  console.log(studyManagerList);
  return studyManagerList;
};

const isManager = async (path: string) => {
  const raw_isManager = await fetch(
    `${API_GATEWAY_URL}/app/manager/${path}/isManager`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const isManager = await raw_isManager.json();
  console.log(isManager)
  return isManager
};

const StudyManagerApi = {
  fetchStudyList,
  fetchStudyManagers,
  fetchStudyMembers,
  isManager,
};

export default StudyManagerApi;
