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

const TagApi = {
  addTag,
};

export default TagApi;
