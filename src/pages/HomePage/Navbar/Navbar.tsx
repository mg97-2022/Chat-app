import React from "react";
import img from "../../../assets/images/letschat.png";
import Search from "./Search";
import Chats from "./Chats";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="userInfo">
        <h2>let's chat</h2>
        <div>
          <img src={img} alt="" />
          <span>mohamed</span>
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      </div>
      <Search />
      <Chats />
    </div>
  );
};

export default Navbar;
