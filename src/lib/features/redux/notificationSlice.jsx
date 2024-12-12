import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {
    count: 0,
    studyCreated: {
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
    addStudyCreated(state, action) {
      state.messages.studyCreated.study.path.push(action.payload);
      state.messages.count += 1;
    },
    clearStudyCreated(state) {
      state.messages.count = 0;
    },
    minusStudyCreated(state, action) {
      console.log("action.payload => ", action.payload);
      state.messages.studyCreated.study.path =
        state.messages.studyCreated.study.path.filter(
          (path) => path !== action.payload
        );
      console.log("state path => ", state.messages.studyCreated.study.path);
      state.messages.count -= 1;
    },
  },
});

export const {
  addStudyCreated: addStudyCreated,
  clearStudyCreated: clearStudyCreated,
  minusStudyCreated: minusStudyCreated,
} = notificationSlice.actions;
export default notificationSlice.reducer;
