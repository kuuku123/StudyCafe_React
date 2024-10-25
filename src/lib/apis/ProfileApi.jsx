const xsrfToken = async () => {
  const raw_xsrf_token = await fetch(`${SERVER_API_URL}/xsrf-token`, {
    credentials: "include",
    method: "GET",
  });
  console.log("raw_xsrf_token ", raw_xsrf_token);
  return raw_xsrf_token;
};

const fetchProfile = async () => {
  const raw_profile = await fetch(`${SERVER_API_URL}/profile`, {
    credentials: "include",
    method: "GET",
  });
  const profile = await raw_profile.json();
  return profile;
};

const fetchProfileImage = async () => {
  const raw_profile_image = await fetch(`${SERVER_API_URL}/profile-image`, {
    credentials: "include",
    method: "GET",
  });
  console.log("raw_profile_image => ", raw_profile_image);
  const profile_image_json = await raw_profile_image.json();
  return profile_image_json;
};

const updatePorfile = async (profileEditInfo) => {
  const raw_response = await fetch(`${SERVER_API_URL}/settings/profile`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(profileEditInfo),
  });
  const response = await raw_response.json();
  return response;
};

const ProfileApi = {
  xsrfToken,
  fetchProfile,
  fetchProfileImage,
  updatePorfile,
};

export default ProfileApi;
