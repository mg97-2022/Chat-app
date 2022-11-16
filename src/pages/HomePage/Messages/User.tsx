import React from "react";
import img from "../../../assets/images/letschat.png";

const User = () => {
  return (
    <>
    <div className="user ">
      <div className="info">
        <img src={img} alt="" />
        <span>just now</span>
      </div>
      <div className="messagesContent">
        <p>hello</p>
        <p>hello</p>
        <img src={img} alt="" />
        <img src={img} alt="" />
        <img src={img} alt="" />
        <p>hello</p>
        <img src={img} alt="" />
        <p>hello</p>
        <p>hello</p>
      </div>
    </div>
    <div className="user owner">
      <div className="info">
        <img src={img} alt="" />
        <span>just now</span>
      </div>
      <div className="messagesContent">
        <p>hello</p>
        <p>hello</p>
        <img src={img} alt="" />
        <img src={img} alt="" />
        <img src={img} alt="" />
        <p>hello</p>
        <img src={img} alt="" />
        <p>hello</p>
        <p>hello</p>
      </div>
    </div>
    </>
  );
};

export default User;
