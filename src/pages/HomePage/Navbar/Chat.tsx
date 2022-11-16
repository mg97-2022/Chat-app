import React from "react";
import { useNavigate } from "react-router-dom";
// import img from "../../../assets/images/letschat.png";

const Chat = () => {
  const navigate = useNavigate();
  const navToMessageHandler = () => {
    navigate("/messages");
  };
  return (
    <div className="chat" onClick={navToMessageHandler}>
      {/* <img src={img} alt="" /> */}
      <div >
        <span>mohamed</span>
        <span>message from hima</span>
      </div>
    </div>
  );
};

export default Chat;
