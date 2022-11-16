import React from "react";
import { Link } from "react-router-dom";

const SigninPage = () => {
  return (
    <div className="formContainer">
      <div className="content">
        <h2>let's chat</h2>
        <span>login</span>
        <form>
          <input required type="email" placeholder="email"/>
          <input required type="password" placeholder="password"/>
          <button type="submit">Sign in</button>
        </form>
        <p>
          You don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
