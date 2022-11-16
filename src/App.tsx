import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Messages from "./pages/HomePage/Messages/Messages";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";

// firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

//
import { useAppDispatch } from "./hooks/hooks";
import { userSliceActions } from "./store/user";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      dispatch(userSliceActions.userLogged(user));
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path='/messages' element={<Messages />} /> */}
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
