import { PasswordForm } from "../../utils/type";

const updatePassword = async (passwordInfo: PasswordForm) => {
  const raw_response = await fetch(`${API_GATEWAY_URL}/auth/update-password`, {
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

const checkEmailVerified = async () => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/auth/check-email-verified`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await raw_response.json();
  return response;
};

const AuthApi = {
  updatePassword,
  checkEmailVerified,
};

export default AuthApi;
