import { PersistPartial } from "redux-persist/es/persistReducer";

// Define the user type for the auth slice
export interface User {
  nickname: string;
  bio: string;
  url: string;
  occupation: string;
  location: string;
  email: string;
  tags: string[];
  zones: string[];
}

export interface LoginFormType {
  nicknameOrEmail: string;
  password: string;
}

export interface SignUpForm {
  nickname: string;
  email: string;
  password: string;
}

export interface ChatProfileCache {
  accountDto: AccountDto;
  isManager: boolean;
}

export interface AccountDto {
  nickname: string;
  bio: string;
  url: string;
  occupation: string;
  location: string;
  email: string;
  emailVerified: boolean;
  profileImage: string;
  tags: TagDto[];
  zones: ZoneDto[];
}

export interface Profile {
  bio: string;
  url: string;
  occupation: string;
  location: string;
  profileImage: string;
}

// Define the auth slice state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  firstLoggedIn: boolean;
}

export interface PasswordForm {
  newPassword: string;
  newPasswordConfirm: string;
}

export interface EmailVerificationDto {
  email: string;
  code: string;
}

// Define the notification slice state
export interface NotificationState {
  messages: {
    count: number;
    studyCreated: {
      events: NotificationDto[];
    };
    studyUpdated: {
      events: NotificationDto[];
    };
  };
}

export enum NotificationType {
  STUDY_CREATED = "STUDY_CREATED",
  STUDY_UPDATED = "STUDY_UPDATED",
  EVENT_ENROLLMENT = "EVENT_ENROLLMENT",
}

export interface NotificationDto {
  id: number;
  title: string;
  link: string;
  message: string;
  checked: boolean;
  accountEmail: string;
  studyPath: string;
  createdDateTime: string;
  notificationType: NotificationType;
}

export interface Notification {
  id: number;
  studyPath: string;
  type: string;
}

export interface StudyForm {
  path: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescriptionText: string;
  studyImage?: string;
}

export interface StudyDto {
  title: string;
  path: string;
  shortDescription: string;
  fullDescription: string;
  studyImage: string;
  published: boolean;
}

export interface StudyJoinDto {
  id: number;
  title: string;
  path: string;
  shortDescription: string;
  fullDescription: string;
  studyImage: string;
  published: boolean;
  tagDtoList: TagDto[];
  zoneDtoList: ZoneDto[];
}

export interface TagDto {
  id?: number;
  title: string;
}
export interface TagForm {
  title: string;
}
export interface TagType {
  value: string;
  label: string;
}

export interface ZoneDto {
  id?: number;
  city: string;
  localNameOfCity?: string;
  province: string;
}
export interface ZoneValue {
  city: string;
  province: string;
}
export interface ZoneType {
  value: ZoneValue;
  label: string;
}

export interface ZoneForm {
  city: string;
  province: string;
}

export interface ApiResponse<T = any> {
  status: string;
  data: T;
  message?: string;
}

export type PersistedAuthState = AuthState & PersistPartial;
