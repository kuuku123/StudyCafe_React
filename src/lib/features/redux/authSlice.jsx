import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nickname: "default nickName",
    bio: "default bio",
    url: "default url",
    occupation: "default occupation",
    location: "default location",
    email: "default email",
    tags: [],
    zones: [],
  },
  isAuthenticated: false,
  firstLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    checkFirstLoggedIn(state) {
      state.firstLoggedIn = true;
    },
  },
});

export const { loginSuccess, logout, checkFirstLoggedIn} =
  authSlice.actions;

export default authSlice.reducer;
