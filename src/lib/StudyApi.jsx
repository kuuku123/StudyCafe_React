const fetchStudyList = async () => {
  const raw_studyList = await fetch(`http://localhost:8081/studyList`, {
    credentials: "include",
    method: "GET",
  });
  const studyList= await raw_studyList.json();
  console.log(studyList)
  return studyList;
};


const StudyApi = {
  fetchStudyList
};

export default StudyApi;