import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "./store";

type initial = {
  user: any;
  isLoggedIn: boolean
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false
  },
  reducers: {
    userLogged(state, action) {
      state.user = action.payload;
    },
  },
});
// export const selectCount = (state: RootState) => state.counter.value

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
