import React from "react";
import img from "../../../assets/images/letschat.png";
import Search from "./Search";
import Chats from "./Chats";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { start } from "repl";

const Navbar = () => {
  const showUsersList = useAppSelector((state) => state.ui.showUsersList);
  return (
    <div
      className="navbar"
      style={{
        left: showUsersList ? "0" : "-100%",
      }}
    >
      <div className="userInfo">
        <img src={img} alt="" />
        <div>
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
