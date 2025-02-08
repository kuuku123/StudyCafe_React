const mergeAccount = async () => {
  const raw_response = await fetch(`${SERVER_API_URL}/social/merge-account`, {
    credentials: "include",
    method: "GET",
  });

  const response = await raw_response.json();
  return response;
};

const separateAccount = async () => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/social/separate-account`,
    {
      credentials: "include",
      method: "GET",
    }
  );

  const response = await raw_response.json();
  return response;
};

const SocialApi = {
  mergeAccount,
  separateAccount,
};

export default SocialApi;
