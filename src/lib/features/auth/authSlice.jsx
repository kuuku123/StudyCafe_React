import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nickname: "default nickName",
    bio: "default bio",
    url: "default url",
    occupation: "default occupation",
    location: "default location",
    email: "default email",
    emailVerified: false,
  },
  isAuthenticated: false,
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
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
