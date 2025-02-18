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

// Define the auth slice state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  firstLoggedIn: boolean;
}

// Define an event type for notifications.
// Adjust the properties based on your actual event structure.
export interface Event {
  id: string; // or number, depending on your design
  // ... add other event properties if needed
}

// Define the notification slice state
export interface NotificationState {
  messages: {
    count: number;
    studyCreated: {
      events: Event[];
    };
    studyUpdated: {
      events: Event[];
    };
  };
}

export interface StudyDto {
  title: string;
  path: string;
  shortDescription: string;
  fullDescription: string;
  studyImage: string;
  published: boolean;
}

export interface ApiResponse<T = any> {
  status: string;
  data: T;
  message?: string;
}


export type PersistedAuthState = AuthState & PersistPartial;
