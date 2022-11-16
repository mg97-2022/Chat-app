import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firestore";
import { constants as rfConstants } from "redux-firestore";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       // Ignore these action types
//       ignoredActions: ['your/action/type'],
//       // Ignore these field paths in all actions
//       ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
//       // Ignore these paths in the state
//       ignoredPaths: ['items.dates'],
//     },
//   }),
// });

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ["firebase", "firestore"],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
