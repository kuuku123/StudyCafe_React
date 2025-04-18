const RoutesEnum = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  PROFILE: "/profile",
  PROFILE_SETTING: "/profile-setting",
  MERGE_ACCOUNT: "/merge-account",
  ALREADY_MERGED_ACCOUNT: "/already-merged-account",
  SOCIAL_ACCOUNT_SET_PASSWORD: "/social-account-setPassword",
  EMAIL_RESEND: "/email-resend",
  CREATE_STUDY: "/create-study",
  JOIN_STUDY: "/join-study",
  MY_STUDY_LIST: "/my-study-list",
  STUDY_MANAGER: (path = ":path") => `/study/manager/${path}`,
  STUDY_MEMBER: (path = ":path") => `/study/member/${path}`,
  ERROR: "*",
};

export default RoutesEnum;
