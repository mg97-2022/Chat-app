import React, { useRef, useEffect } from "react";
import img from "../../../assets/images/letschat.png";
import { useAppSelector } from "../../../hooks/hooks";
import { messageProp } from "./UserMessages";

type props = {
  message: messageProp;
};

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setTime(secs * 1000);
  return {
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes(),
  };
}

const Message = ({ message }: props) => {
  const user = useAppSelector((state) => state.user.user);
  const friend = useAppSelector((state) => state.chat.friend);
  const lastMessage = useRef<HTMLDivElement>();

  useEffect(() => {
    // lastMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  let hour = toDateTime(message.date.seconds).hour;
  if (hour > 12) {
    hour -= 12;
  }
  let minutes: string = String(toDateTime(message.date.seconds).minute);
  if (toDateTime(message.date.seconds).minute < 10) {
    minutes = `0` + String(toDateTime(message.date.seconds).minute);
  }
  return (
    <div
      ref={lastMessage}
      className={`message ${message.senderId === user.uid ? "owner" : ""}`}
    >
      <div className="info">
        <img
          src={message.senderId === user.uid ? user.photoURL : friend.photoURL}
          alt=""
        />
      </div>
      <div className="messagesContent">
        <img src={message.img} alt="" />
        {String(message.text).length !== 0 ? (
          <p>
            {message.text}{" "}
            <span>
              {hour}:{minutes}
              {toDateTime(message.date.seconds).hour > 12 ? "PM" : "AM"}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Message;
