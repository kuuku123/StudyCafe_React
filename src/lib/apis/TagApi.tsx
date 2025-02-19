import { TagForm, TagType } from "../../utils/type";

const getStudyTags = async (path: string) => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/app/study/${path}/settings/tags`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  console.log("raw_get_zone => ", raw_response);
  const get_tag_json = await raw_response.json();
  return get_tag_json;
};

const addStudyTag = async (path: string, tagData: TagForm[]) => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/app/study/${path}/settings/tags/add`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    }
  );
  console.log("raw_response => ", raw_response);
  const response_json = raw_response.json();
  return response_json;
};
const removeStudyTag = async (path: string, tagData: TagForm) => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/app/study/${path}/settings/tags/remove`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    }
  );
  console.log("raw_response => ", raw_response);
  const response_json = raw_response.json();
  return response_json;
};

const getAccountTags = async () => {
  const raw_response = await fetch(`${API_GATEWAY_URL}/app/settings/tags`, {
    credentials: "include",
    method: "GET",
  });
  console.log("raw_get_zone => ", raw_response);
  const get_tag_json = await raw_response.json();
  return get_tag_json;
};

const addAccountTag = async (tagData: TagForm[]) => {
  const raw_response = await fetch(`${API_GATEWAY_URL}/app/settings/tags/add`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagData),
  });
  console.log("raw_response => ", raw_response);
  const response_json = raw_response.json();
  return response_json;
};

const removeAccountTag = async (tagData: TagForm) => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/app/settings/tags/remove`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    }
  );
  console.log("raw_response => ", raw_response);
  const response_json = raw_response.json();
  return response_json;
};

const changeTagLabelToTitile = (tags: TagType[] | null) => {
  if (tags != null) {
    const newTags = tags.map((tag) => ({
      title: tag.label,
    }));
    return newTags;
  }
  return [];
};

const TagApi = {
  getStudyTags,
  addStudyTag,
  removeStudyTag,
  getAccountTags,
  addAccountTag,
  removeAccountTag,
  changeTagLabelToTitile,
};

export default TagApi;
