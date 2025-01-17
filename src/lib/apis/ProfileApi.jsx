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

const updatePassword = async (passwordInfo) => {
  const raw_response = await fetch(`${SERVER_API_URL}/settings/password`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwordInfo),
  });
  const response = await raw_response.json();
  return response;
};

const ProfileApi = {
  xsrfToken,
  fetchProfile,
  updatePorfile,
  updatePassword,
};

export default ProfileApi;
