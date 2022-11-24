import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SigninPage = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const enteredEmail = useRef<HTMLInputElement>(null);
  const enteredPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    const email = enteredEmail.current!.value;
    const password = enteredPassword.current!.value;

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      setError(true);
    }
  };

  const googleErrorHandler = (err) => {
    setError(err);
  };
  const googleLoadingHandler = (load) => {
    setIsLoading(load);
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
        <GoogleAuth
          onError={googleErrorHandler}
          onLoading={googleLoadingHandler}
        />
        <p>
          You don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
