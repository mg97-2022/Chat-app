import React from "react";
import img from "../../../assets/images/letschat.png";
import Search from "./Search";
import Chats from "./Chats";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="userInfo">
        <h2>let's chat</h2>
        <div>
          <img src={img} alt="" />
          <span>mohamed</span>
          <button>logout</button>
        </div>
      </div>
      <Search />
      <Chats />
    </div>
  );
};

export default Navbar;
