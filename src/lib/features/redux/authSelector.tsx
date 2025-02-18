// authSelectors.ts
import { RootState } from "./store";
import { PersistedAuthState } from "../../../utils/type"; // define this as AuthState & PersistPartial

export const selectAuth = (state: RootState): PersistedAuthState =>
  state.auth as PersistedAuthState;
