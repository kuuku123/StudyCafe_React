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

const fetchStudyByTagsAndZones = async (tags, zones, page, size) => {
  try {
    // Handle tags and zones being null or undefined
    const tagParams =
      tags && tags.length > 0
        ? tags.map((tag) => `tags=${encodeURIComponent(tag.title)}`).join("&")
        : ""; // If no tags, return an empty string

    const zoneParams =
      zones && zones.length > 0
        ? zones
            .map(
              (zone) =>
                `cities=${encodeURIComponent(
                  zone.city
                )}&provinces=${encodeURIComponent(zone.province)}`
            )
            .join("&")
        : ""; // If no zones, return an empty string

    // Add page and size params
    const paginationParams = `page=${page}&size=${size}`;

    // Combine all query parameters, ensuring no extra '&' if tags or zones are missing
    const queryParams = [tagParams, zoneParams, paginationParams]
      .filter((param) => param) // Filter out empty strings
      .join("&");

    console.log("queryParams => ", queryParams);

    // Make the fetch request with the constructed query params
    const raw_studies = await fetch(
      `${SERVER_API_URL}/get-study-by-tags-and-zones?${queryParams}`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    // Check if the request was successful
    if (!raw_studies.ok) {
      throw new Error("Failed to fetch studies");
    }

    // Parse the JSON response
    const studies_json = await raw_studies.json();
    console.log("study_json => ", studies_json);
    return studies_json;
  } catch (error) {
    console.error("Error fetching studies:", error);
    throw error;
  }
};

const fetchTotalStudiesCount = async () => {
  const raw_totalStudiesCount = await fetch(`${SERVER_API_URL}/total-study`, {
    credentials: "include",
    method: "GET",
  });
  const totalStudiesCount = await raw_totalStudiesCount.json();
  console.log(totalStudiesCount);
  return totalStudiesCount;
};

const StudyApi = {
  createStudy,
  fetchStudyList,
  fetchStudyMembers,
  fetchStudyImage,
  fetchStudyByTagsAndZones,
  publishStudy,
  fetchTotalStudiesCount,
};

export default StudyApi;
