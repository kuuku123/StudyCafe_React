
const fetchProfile = async () => {
  const raw_profile = await fetch(`${API_GATEWAY_URL}/app/profile`, {
    credentials: "include",
    method: "GET",
  });
  const profile = await raw_profile.json();
  return profile;
};

const updatePorfile = async (profileEditInfo) => {
  const raw_response = await fetch(`${API_GATEWAY_URL}/app/settings/profile`, {
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
  fetchProfile,
  updatePorfile,
};

export default ProfileApi;
