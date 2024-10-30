const mergeAccount = async () => {
  const raw_response = await fetch(`${SERVER_API_URL}/social/merge-accounts`, {
    credentials: "include",
    method: "GET",
  });

  const response = await raw_response.json();
  return response;
};

const separateAccount = async () => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/social/separate-accounts`,
    {
      credentials: "include",
      method: "GET",
    }
  );

  const response = await raw_response.json();
  return response;
};

const getEmail = async () => {
  const raw_response = await fetch(`${SERVER_API_URL}/social/get-email`, {
    credentials: "include",
    method: "GET",
  });

  const response = await raw_response.json();
  return response;
};

const SocialApi = {
  mergeAccount,
  separateAccount,
  getEmail,
};

export default SocialApi;
