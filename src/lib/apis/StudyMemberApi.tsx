import { AccountDto, ApiResponse } from "../../utils/type";

const fetchStudyList = async () => {
  const raw_studyList = await fetch(
    `${API_GATEWAY_URL}/app/member/study-list`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyList = await raw_studyList.json();
  console.log(studyList);
  return studyList;
};

const fetchStudyMembers = async (path: string) => {
  const raw_studyMemberList = await fetch(
    `${API_GATEWAY_URL}/app/member/${path}/study-members`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyMemberList: ApiResponse<AccountDto[]> =
    await raw_studyMemberList.json();
  console.log(studyMemberList);
  return studyMemberList;
};

const fetchStudyManagers = async (path: string) => {
  const raw_studyManagerList = await fetch(
    `${API_GATEWAY_URL}/app/member/${path}/study-managers`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const studyManagerList = await raw_studyManagerList.json();
  console.log(studyManagerList);
  return studyManagerList;
};

const isMember = async (path: string) => {
  const raw_isMember = await fetch(
    `${API_GATEWAY_URL}/app/member/${path}/isMember`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const isMember = await raw_isMember.json();
  console.log(isMember);
  return isMember;
};

const StudyMemberApi = {
  fetchStudyList,
  fetchStudyManagers,
  fetchStudyMembers,
  isMember,
};

export default StudyMemberApi;
