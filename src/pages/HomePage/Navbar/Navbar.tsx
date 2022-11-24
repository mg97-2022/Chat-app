import React, { useState } from "react";
import img from "../../../assets/images/letschat.png";
import Search from "./Search";
import Chats from "./Chats";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { start } from "repl";
import { handleName } from "../Messages/Topbar";

const Navbar = () => {
  const showUsersList = useAppSelector((state) => state.ui.showUsersList);
  const user = useAppSelector((state) => state.user.user);

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
          <img src={user.photoURL} alt="" />
          <span>{handleName(user.displayName)}</span>
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      </div>
      <Search />
      <Chats />
    </div>
  );
};

export default Navbar;
