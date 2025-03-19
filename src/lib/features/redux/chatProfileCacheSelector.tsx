import { RootState } from "./store";

// Selector to return the entire cache
export const selectChatProfileCache = (state: RootState) =>
  state.chatProfileCache.cache;

// Selector to return a chat profile for a given email
export const selectChatProfileByEmail = (email: string) => (state: RootState) =>
  state.chatProfileCache.cache[email];
