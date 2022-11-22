import React, { ReactElement, ReactNode, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Messages from "./pages/HomePage/Messages/Messages";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";

// firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// redux
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { userSliceActions } from "./store/user";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const authenticated = onAuthStateChanged(auth, (user) => {
      console.log(user);
      dispatch(userSliceActions.userLogged(user));
    });
    return () => {
      authenticated();
    };
  }, [dispatch]);

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }): any => {
    if (!user) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
