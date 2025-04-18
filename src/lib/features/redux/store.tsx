import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";
import chatProfileCacheReduer from "./chatProfileCacheSlice";

// Import other reducers if you have them
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // This defaults to localStorage
import sessionStorage from "redux-persist/es/storage/session";

const persistAuthConfig = {
  key: "auth", // Key to store the auth state in localStorage
  storage, // Use localStorage (or sessionStorage, depending on your use case)
  whitelist: ["user", "isAuthenticated"], // Only persist these keys
};
const persistNotificationConfig = {
  key: "notifications", // Key to store the auth state in localStorage
  storage: sessionStorage, // Use localStorage (or sessionStorage, depending on your use case)
  whitelist: ["messages"], // Only persist these keys
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedNotificationReducer = persistReducer(
  persistNotificationConfig,
  notificationReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Apply the persisted reducer to the auth slice
    notifications: notificationReducer,
    chatProfileCache: chatProfileCacheReduer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
