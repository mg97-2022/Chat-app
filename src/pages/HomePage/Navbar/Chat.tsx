import React from "react";
import { useNavigate } from "react-router-dom";
// import img from "../../../assets/images/letschat.png";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

const Chat = () => {
  const dispatch = useAppDispatch()
  const showMessagesHandler = () => {
    dispatch(uiSliceActions.hideUsersList())
  };
  return (
    <div className="chat" onClick={showMessagesHandler}>
      {/* <img src={img} alt="" /> */}
      <div >
        <span>mohamed</span>
        <span>message from hima</span>
      </div>
    </div>
  );
};

export default Chat;
