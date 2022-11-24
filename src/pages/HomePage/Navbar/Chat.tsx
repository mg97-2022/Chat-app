import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

const Chat = ({ friend }) => {
  const dispatch = useAppDispatch();

  const showMessagesHandler = async () => {
    // used to show messages part in mobile
    dispatch(uiSliceActions.hideUsersList());
  };
  return (
    <div className="chat" onClick={showMessagesHandler}>
      <img src={friend.userInfo.photoURL} alt="" />
      <div>
        <span>{friend.userInfo.displayName}</span>
        <span>message from hima</span>
      </div>
    </div>
  );
};

export default Chat;
