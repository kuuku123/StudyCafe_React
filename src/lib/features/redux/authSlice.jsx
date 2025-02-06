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
    tags: [],
    zones: [],
  },
  isAuthenticated: false,
  firstLoggedIn: false,
  jwt: "",
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
    addJWT(state, action) {
      state.jwt = action.payload;
    },
    removeJWT(state) {
      state.jwt = null;
    },
  },
});

export const { loginSuccess, logout, checkFirstLoggedIn, addJWT, removeJWT } =
  authSlice.actions;

export default authSlice.reducer;
