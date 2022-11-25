import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    hideUsersList: false,
  },
  reducers: {
    showList(state) {
      state.hideUsersList = false;
    },
    hideList(state) {
      state.hideUsersList = true;
    },
  },
});
// export const selectCount = (state: RootState) => state.counter.value

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
