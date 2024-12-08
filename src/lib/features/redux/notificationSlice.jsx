import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {
    studyCreate: {
      count: 0,
      study: {
        path: [],
      },
    },
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addStudyCreate(state, action) {
      state.messages.studyCreate.study.path.push(action.payload)
      state.messages.studyCreate.count += 1;
    },
    clearStudyCreate(state) {
      state.messages.studyCreate.count = 0;
    },
    minusStudyCreate(state, action) {
      state.messages.studyCreate.study.path.pop(action.payload)
      state.messages.studyCreate.count -= 1;
    },
  },
});

export const { addStudyCreate, clearStudyCreate, minusStudyCreate } = notificationSlice.actions;
export default notificationSlice.reducer;
