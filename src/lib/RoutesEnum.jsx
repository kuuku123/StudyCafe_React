const RoutesEnum = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  PROFILE: "/profile",
  PROFILE_SETTING: "/profile-setting",
  EMAIL_RESEND: "/email-resend",
  CREATE_STUDY: "/create-study",
  JOIN_STUDY: "/join-study",
  MY_STUDY_LIST: "/my-study-list",
  STUDY: (path = ":path") => `/study/${path}`,
  ERROR: "*",
};

export default RoutesEnum;
