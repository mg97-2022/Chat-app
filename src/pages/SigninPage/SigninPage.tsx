import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import ErrorHandling from "../../components/ErrorHandling";

const SigninPage = () => {
  const [error, setError] = useState<boolean>(false);
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      setError(true);
    }
    setIsLoading(false);
  };

  const googleErrorHandler = (err: boolean) => {
    setError(err);
  };
  const googleLoadingHandler = (load: boolean) => {
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
        <ErrorHandling isLoading={isLoading} error={error} />
        <p>
          You don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
