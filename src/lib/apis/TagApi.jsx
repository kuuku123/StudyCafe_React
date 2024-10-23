const getTags = async (path) => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/tags`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  console.log("raw_get_zone => ", raw_response);
  const get_tag_json = await raw_response.json();
  return get_tag_json;
};

const addTag = async (path, tagData) => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/tags/add`,
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
const removeTag = async (path, tagData) => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/tags/remove`,
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

const changeTagLabelToTitile = (tags) => {
  const newTags = tags.map((tag) => ({
    title: tag.label,
  }));
  return newTags;
};

const TagApi = {
  getTags,
  addTag,
  removeTag,
  changeTagLabelToTitile,
};

export default TagApi;
