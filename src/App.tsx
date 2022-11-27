import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

// firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// redux
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { userSliceActions } from "./store/user";

const HomePage = React.lazy(() =>
  import("./pages/HomePage/HomePage").then(({ default: HomePage }) => ({
    default: HomePage,
  }))
);
const SigninPage = React.lazy(() =>
  import("./pages/SigninPage/SigninPage").then(({ default: SigninPage }) => ({
    default: SigninPage,
  }))
);
const SignupPage = React.lazy(() =>
  import("./pages/SignupPage/SignupPage").then(({ default: SignupPage }) => ({
    default: SignupPage,
  }))
);

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const authenticated = onAuthStateChanged(auth, (user) => {
      dispatch(userSliceActions.userLogged(user));
    });
    return () => {
      authenticated();
    };
  }, [dispatch]);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }): any => {
    if (!user) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
