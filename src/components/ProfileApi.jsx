const fetchProfile = async () => {
  const raw_profile = await fetch(`http://localhost:8081/profile`, {
    credentials: "include",
    method: "GET",
  });
  const profile = await raw_profile.json();
  return profile;
};

const fetchProfileImage = async () => {
  const raw_profile_image = await fetch(
    `http://localhost:8081/profile-image?user=${sessionStorage.getItem(
      "user"
    )}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const profile_image = await raw_profile_image.blob();
  return profile_image
};

const ProfileApi = {
  fetchProfile,
  fetchProfileImage,
};

export default ProfileApi;
