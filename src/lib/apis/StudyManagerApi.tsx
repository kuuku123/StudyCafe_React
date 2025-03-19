import { AccountDto, ApiResponse } from "../../utils/type";

const fetchStudyList = async () => {
  const raw_studyList = await fetch(
    `${API_GATEWAY_URL}/app/manager/study-list`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyList = await raw_studyList.json();
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
  const studyManagerList: ApiResponse<AccountDto[]> =
    await raw_studyManagerList.json();
  return studyManagerList;
};

const amiManager = async (path: string) => {
  const raw_amiManager = await fetch(
    `${API_GATEWAY_URL}/app/manager/${path}/amiManager`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const amiManager = await raw_amiManager.json();
  return amiManager;
};

const isManager = async (path: string, email: string) => {
  const raw_isManager = await fetch(
    `${API_GATEWAY_URL}/app/manager/${path}/isManager/${email}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const isManager = await raw_isManager.json();
  return isManager;
};

const StudyManagerApi = {
  fetchStudyList,
  fetchStudyManagers,
  fetchStudyMembers,
  amiManager,
  isManager,
};

export default StudyManagerApi;
