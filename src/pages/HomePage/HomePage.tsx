import React from "react";
import Messages from "./Messages/Messages";
import Navbar from "./Navbar/Navbar";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="content">
        <Navbar />
        <Messages />
      </div>
    </div>
  );
};

export default HomePage;
