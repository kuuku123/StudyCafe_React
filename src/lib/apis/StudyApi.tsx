import { StudyForm, TagForm, ZoneForm } from "../../utils/type";

const fetchStudy = async (path: string) => {
  const raw_study = await fetch(`${API_GATEWAY_URL}/app/get-study/${path}`, {
    credentials: "include",
    method: "GET",
  });
  const study = await raw_study.json();
  console.log(study);
  return study;
};

const createStudy = async (createStudyForm: StudyForm) => {
  const raw_response = await fetch(`${API_GATEWAY_URL}/app/new-study`, {
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

const publishStudy = async (path: string) => {
  const raw_published_study = await fetch(
    `${API_GATEWAY_URL}/app/study/${path}/settings/publish`,
    {
      credentials: "include",
      method: "POST",
    }
  );
  console.log("raw_published_study => ", raw_published_study);
  const publicshed_study_json = await raw_published_study.json();
  return publicshed_study_json;
};

const joinStudy = async (path: string) => {
  const raw_data = await fetch(`${API_GATEWAY_URL}/app/study/${path}/join`, {
    credentials: "include",
    method: "POST",
  });
  const json_data = await raw_data.json();
  console.log("joinStudy => ", json_data);
  return json_data;
};

const checkStudyJoined = async (path: string) => {
  const raw_data = await fetch(
    `${API_GATEWAY_URL}/app/study/${path}/checkJoined`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const json_data = await raw_data.json();
  console.log("checkJoined => ", json_data);
  return json_data;
};

const leaveStudy = async (path: string) => {
  const raw_data = await fetch(`${API_GATEWAY_URL}/app/study/${path}/leave`, {
    credentials: "include",
    method: "POST",
  });
  const json_data = await raw_data.json();
  console.log("leaveStudy => ", json_data);
  return json_data;
};

const fetchStudyByTagsAndZones = async (
  tags: TagForm[] | null,
  zones: ZoneForm[] | null,
  page: number,
  size: number
) => {
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
      `${API_GATEWAY_URL}/app/get-study-by-tags-and-zones?${queryParams}`,
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
  const raw_totalStudiesCount = await fetch(
    `${API_GATEWAY_URL}/app/total-study`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const totalStudiesCount = await raw_totalStudiesCount.json();
  console.log(totalStudiesCount);
  return totalStudiesCount;
};

const updateStudyInfo = async (updateStudyForm: StudyForm, path: string) => {
  const raw_updateStudyInfo = await fetch(
    `${API_GATEWAY_URL}/app/study/${path}/settings/update-study`,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(updateStudyForm),
    }
  );
  const updateStudyInfo = await raw_updateStudyInfo.json();
  console.log(updateStudyInfo);
  return updateStudyInfo;
};

const StudyApi = {
  fetchStudy,
  createStudy,
  fetchStudyByTagsAndZones,
  publishStudy,
  joinStudy,
  checkStudyJoined,
  leaveStudy,
  fetchTotalStudiesCount,
  updateStudyInfo,
};

export default StudyApi;
