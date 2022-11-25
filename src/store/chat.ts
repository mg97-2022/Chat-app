import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    friend: null,
  },
  reducers: {
    updateFriend(state, action) {
      state.friend = action.payload;
    },
  },
});

export const chatSliceActions = chatSlice.actions;
export default chatSlice.reducer;
