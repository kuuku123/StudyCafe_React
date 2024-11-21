import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {
    count: 0,
  }, // Stores notifications
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.count = action.payload;
    },
    clearMessages(state) {
      state.messages.count = 0;
    },
  },
});

export const { addMessage, clearMessages } = notificationSlice.actions;
export default notificationSlice.reducer;
