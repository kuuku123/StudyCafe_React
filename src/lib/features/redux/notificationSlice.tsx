import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../../../utils/type";

const initialState: NotificationState = {
  messages: {
    count: 0,
    studyCreated: {
      events: [],
    },
    studyUpdated: {
      events: [],
    },
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addStudyCreated(state, action) {
      state.messages.studyCreated.events.push(JSON.parse(action.payload));
      state.messages.count += 1;
    },
    clearStudyCreated(state) {
      state.messages.count = 0;
      state.messages.studyCreated.events = [];
    },
    addStudyUpdated(state, action) {
      console.log("addStudyUpdated => ", action.payload);
      state.messages.studyUpdated.events.push(JSON.parse(action.payload));
      state.messages.count += 1;
    },
    clearStudyUpdated(state) {
      state.messages.count = 0;
      state.messages.studyUpdated.events = [];
    },
    minusStudyCreated(state, action) {
      console.log("action.payload => ", action.payload);
      state.messages.studyCreated.events =
        state.messages.studyCreated.events.filter(
          (event) => event.id !== action.payload
        );
      console.log("minus state path => ", state.messages.studyCreated.events);
      state.messages.count -= 1;
    },
    minusStudyUpdated(state, action) {
      console.log("action.payload => ", action.payload);
      state.messages.studyUpdated.events =
        state.messages.studyUpdated.events.filter(
          (event) => event.id !== action.payload
        );
      console.log("minus state path => ", state.messages.studyUpdated.events);
      state.messages.count -= 1;
    },
  },
});

export const {
  addStudyCreated,
  addStudyUpdated,
  clearStudyCreated,
  clearStudyUpdated,
  minusStudyCreated,
  minusStudyUpdated,
} = notificationSlice.actions;
export default notificationSlice.reducer;
