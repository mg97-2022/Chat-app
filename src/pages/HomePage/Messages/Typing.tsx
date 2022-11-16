import React from "react";
import img from "../../../assets/images/attach.png";

const Typing = () => {
  return (
    <div className="typing">
      <input type="text" placeholder="Type something..."/>
      <div>
        <input type="file" id="fileMessage" />
        <label htmlFor="fileMessage">
          <img src={img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  );
};

export default Typing;
