import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    SearchFriend: null,
  },
  reducers: {
    userLogged(state, action) {
      state.user = action.payload;
    },
    setSearchFriend(state, action) {
      state.SearchFriend = action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
