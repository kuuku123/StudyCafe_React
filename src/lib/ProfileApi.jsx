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
    `http://localhost:8081/profile-image`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  console.log("raw_profile_image => ", raw_profile_image);
  const profile_image_json = await raw_profile_image.json();
  return profile_image_json;
};

const ProfileApi = {
  fetchProfile,
  fetchProfileImage,
};

export default ProfileApi;
