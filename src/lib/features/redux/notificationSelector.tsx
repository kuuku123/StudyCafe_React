import { RootState } from "./store";

export const selectStudyCreated = (state: RootState) =>
  state.notifications.messages.studyCreated.events;

export const selectStudyUpdated = (state: RootState) =>
  state.notifications.messages.studyUpdated.events;

export const selectMessagesCount = (state: RootState) =>
  state.notifications.messages.count;
