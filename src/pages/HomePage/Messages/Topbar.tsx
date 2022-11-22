import React from "react";
import cam from "../../../assets/images/cam.png";
import add from "../../../assets/images/add.png";
import more from "../../../assets/images/more.png";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { GoThreeBars } from "react-icons/go";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

const Topbar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="top">
      <div className="left">
        <HiArrowNarrowLeft
          onClick={() => dispatch(uiSliceActions.showUsersList())}
        />
        <span>mohamed</span>
      </div>
      <div>
        <img src={cam} alt="" />
        <img src={add} alt="" />
        <img src={more} alt="" />
      </div>
    </div>
  );
};

export default Topbar;
