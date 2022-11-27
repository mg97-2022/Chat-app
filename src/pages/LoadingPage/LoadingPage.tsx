import React from "react";
import logo from "../../assets/images/logowbg.png";
const LoadingPage = () => {
  return (
    <div className="loadingPage">
      <img src={logo} alt="logo" />
      <span>Loading...</span>
    </div>
  );
};

export default LoadingPage;
