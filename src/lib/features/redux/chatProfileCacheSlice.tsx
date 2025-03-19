import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatProfileCache } from "../../../utils/type";

interface ChatProfileCacheState {
  cache: Record<string, ChatProfileCache>;
}

const initialState: ChatProfileCacheState = {
  cache: {},
};

const chatProfileCacheSlice = createSlice({
  name: "chatProfileCache",
  initialState,
  reducers: {
    setCacheProfile(
      state,
      action: PayloadAction<{ email: string; profile: ChatProfileCache }>
    ) {
      state.cache[action.payload.email] = action.payload.profile;
    },
    clearCache(state) {
      state.cache = {};
    },
  },
});

export const { setCacheProfile, clearCache } = chatProfileCacheSlice.actions;
export default chatProfileCacheSlice.reducer;
