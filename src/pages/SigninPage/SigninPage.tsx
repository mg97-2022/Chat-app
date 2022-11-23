import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "../../components/GoogleButton";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SigninPage = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const enteredEmail = useRef<HTMLInputElement>(null);
  const enteredPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = enteredEmail.current!.value;
    const password = enteredPassword.current!.value;

    try {
      setIsLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signinWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });

      await setDoc(doc(db, "userChats", result.user.uid), {});

      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="content">
        <h2>let's chat</h2>
        <span>login</span>
        <form onSubmit={submitHandler}>
          <input ref={enteredEmail} required type="email" placeholder="email" />
          <input
            ref={enteredPassword}
            required
            type="password"
            placeholder="password"
          />
          <button type="submit">Sign in</button>
        </form>
        <GoogleButton onClick={signinWithGoogle} />
        <p>
          You don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
