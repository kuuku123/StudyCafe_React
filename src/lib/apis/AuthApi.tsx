import { EmailVerificationDto, PasswordForm } from "../../utils/type";

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

const checkAndMakeEmailVerificationCode = async (email: string) => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/auth/check-and-make-email-verification-code`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    }
  );
  const response = await raw_response.json();
  return response;
};

const verifyEmail = async (emailVerificationDto: EmailVerificationDto) => {
  const raw_response = await fetch(`${API_GATEWAY_URL}/auth/verify-email`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailVerificationDto),
  });
  const response = await raw_response.json();
  return response;
};

const AuthApi = {
  updatePassword,
  checkEmailVerified,
  checkAndMakeEmailVerificationCode,
  verifyEmail,
};

export default AuthApi;
