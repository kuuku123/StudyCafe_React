import { AccountDto, ApiResponse, Profile } from "../../utils/type";

const fetchMyProfile = async () => {
  const raw_profile = await fetch(`${API_GATEWAY_URL}/app/profile`, {
    credentials: "include",
    method: "GET",
  });
  const profile: ApiResponse<AccountDto> = await raw_profile.json();
  return profile;
};

const fetchProfile = async (email: string) => {
  const raw_profile = await fetch(`${API_GATEWAY_URL}/app/profile/${email}`, {
    credentials: "include",
    method: "GET",
  });
  const profile: ApiResponse<AccountDto> = await raw_profile.json();
  return profile;
};

const updatePorfile = async (profileEditInfo: Profile) => {
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
  fetchMyProfile,
  fetchProfile,
  updatePorfile,
};

export default ProfileApi;
