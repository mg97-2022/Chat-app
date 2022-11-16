import React from "react";
import cam from "../../../assets/images/cam.png";
import add from "../../../assets/images/add.png";
import more from "../../../assets/images/more.png";

const Topbar = () => {
  return (
    <div className="top">
      <span>mohamed</span>
      <div>
        <img src={cam} alt="" />
        <img src={add} alt="" />
        <img src={more} alt="" />
      </div>
    </div>
  );
};

export default Topbar;
