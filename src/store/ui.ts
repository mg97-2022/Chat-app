import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showUsersList: false,
  },
  reducers: {
    showUsersList(state) {
      state.showUsersList = true;
    },
    hideUsersList(state) {
      state.showUsersList = false;
    },
  },
});
// export const selectCount = (state: RootState) => state.counter.value

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
