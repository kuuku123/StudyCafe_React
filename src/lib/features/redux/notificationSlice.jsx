import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {
    count: 0,
    studyCreated: {
      study: {
        path: [],
      },
    },
    studyUpdated: {
      study:{
        path:[],
      }
    }
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
    addStudyUpdated(state, action) {
      state.messages.studyUpdated.study.path.push(action.payload);
      state.messages.count += 1;
    },
    clearStudyUpdated(state) {
      state.messages.count = 0;
    },
    minusStudyCreated(state, action) {
      console.log("action.payload => ", action.payload);
      state.messages.studyCreated.study.path =
        state.messages.studyCreated.study.path.filter(
          (event) => event.id !== action.payload
        );
      console.log("minus state path => ", state.messages.studyCreated.study.path);
      state.messages.count -= 1;
    },
    minusStudyUpdated(state, action) {
      console.log("action.payload => ", action.payload);
      state.messages.studyUpdated.study.path =
        state.messages.studyUpdated.study.path.filter(
          (event) => event.id !== action.payload
        );
      console.log("minus state path => ", state.messages.studyUpdated.study.path);
      state.messages.count -= 1;
    },
  },
});

export const {
  addStudyCreated: addStudyCreated,
  addStudyUpdated: addStudyUpdated,
  clearStudyCreated: clearStudyCreated,
  clearStudyUpdated: clearStudyUpdated,
  minusStudyCreated: minusStudyCreated,
  minusStudyUpdated: minusStudyUpdated,


} = notificationSlice.actions;
export default notificationSlice.reducer;
